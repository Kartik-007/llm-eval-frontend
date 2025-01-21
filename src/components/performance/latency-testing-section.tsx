"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import {
  LatencyTestConfig,
  PerformanceTestRequest,
  PerformanceTestResult
} from "@/types/performance"
import { testLatency, getDefaultConfig } from "@/lib/services/latency-service"
import { LLM_PROVIDERS } from "@/types/qa"

import { LatencyCharts } from "./latency-charts"

export function LatencyTestingSection() {
  const [loading, setLoading] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [results, setResults] = useState<Record<string, PerformanceTestResult[]> | null>(null)
  const [config, setConfig] = useState<LatencyTestConfig>({
    num_iterations: 5,
    prompt_sizes: [50, 100, 500],
    max_tokens: 100,
    warm_up_runs: 1
  })
  const [basePrompt, setBasePrompt] = useState("")

  useEffect(() => {
    getDefaultConfig().then(setConfig).catch(console.error)
  }, [])

  const handleProviderSelect = (value: string) => {
    if (selectedProviders.includes(value)) {
      setSelectedProviders(selectedProviders.filter(p => p !== value))
    } else {
      setSelectedProviders([...selectedProviders, value])
    }
  }

  const handleSubmit = async () => {
    if (selectedProviders.length === 0) {
      alert("Please select at least one provider")
      return
    }

    try {
      setLoading(true)
      const request: PerformanceTestRequest = {
        providers: selectedProviders,
        test_config: config,
        base_prompt: basePrompt || undefined
      }
      const results = await testLatency(request)
      setResults(results)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to run latency tests")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setResults(null)
    setSelectedProviders([])
    setBasePrompt("")
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Analysis</CardTitle>
          <CardDescription>
            Measure and compare response times across different LLM providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Select Providers</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {LLM_PROVIDERS.map((provider) => (
                  <Button
                    key={provider.value}
                    variant={selectedProviders.includes(provider.value) ? "default" : "outline"}
                    onClick={() => handleProviderSelect(provider.value)}
                    size="sm"
                  >
                    {provider.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="iterations">Number of Iterations</Label>
                <Input
                  id="iterations"
                  type="number"
                  min={1}
                  max={100}
                  value={config.num_iterations}
                  onChange={(e) => setConfig({
                    ...config,
                    num_iterations: parseInt(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  min={1}
                  value={config.max_tokens}
                  onChange={(e) => setConfig({
                    ...config,
                    max_tokens: parseInt(e.target.value)
                  })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrompt">Custom Base Prompt (Optional)</Label>
              <Textarea
                id="basePrompt"
                placeholder="Enter a custom prompt to test with..."
                value={basePrompt}
                onChange={(e) => setBasePrompt(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to use default prompts
              </p>
            </div>

            <div className="flex justify-between">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Run Tests
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

    
{/* Results Section */}
{results && (
  <div className="space-y-6">
    {/* Visualization Charts */}
    <LatencyCharts results={results} />
    
    {/* Tabular Results */}
    <Card>
      <CardHeader>
        <CardTitle>Detailed Results</CardTitle>
        <CardDescription>
          Complete performance metrics for each provider and prompt size
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(results).map(([provider, providerResults]) => (
          <div key={provider} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{provider}</h3>
              <span className="text-sm text-muted-foreground">
                Model: {providerResults[0].model}
              </span>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              {providerResults.map((result) => (
                <Card key={result.prompt_size}>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {result.prompt_size} Characters
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {/* Response Time Metrics */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Response Time</h4>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <dt className="text-muted-foreground">Average</dt>
                            <dd className="font-medium">
                              {result.latency.average_latency.toFixed(2)}s
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Min/Max</dt>
                            <dd className="font-medium">
                              {result.latency.min_latency.toFixed(2)}s / {result.latency.max_latency.toFixed(2)}s
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">90th %ile</dt>
                            <dd className="font-medium">
                              {result.latency.p90_latency.toFixed(2)}s
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">95th %ile</dt>
                            <dd className="font-medium">
                              {result.latency.p95_latency.toFixed(2)}s
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Token Metrics */}
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Token Metrics</h4>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <dt className="text-muted-foreground">Tokens/Second</dt>
                            <dd className="font-medium">
                              {result.token_metrics.tokens_per_second.toFixed(1)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Total Tokens</dt>
                            <dd className="font-medium">
                              {result.token_metrics.total_tokens}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Prompt</dt>
                            <dd className="font-medium">
                              {result.token_metrics.prompt_tokens}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Completion</dt>
                            <dd className="font-medium">
                              {result.token_metrics.completion_tokens}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Standard Deviation */}
                      <div className="pt-2 border-t">
                        <dt className="text-sm text-muted-foreground">Std Deviation</dt>
                        <dd className="text-sm font-medium">
                          {result.latency.std_deviation.toFixed(3)}s
                        </dd>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
)}
    </div>
  )
}