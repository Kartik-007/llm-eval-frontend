"use client"

import { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { evaluateSecurityTest } from "@/lib/services/security-service"
import { LLM_PROVIDERS } from "@/types/qa"
import { SecurityTestRequest, SecurityAnalysisResult, InjectionTestType } from "@/types/security"

const INJECTION_TEST_TYPES = [
  { value: "system_prompt", label: "System Prompt Injection" },
  { value: "role_playing", label: "Role Playing Attack" },
  { value: "command_injection", label: "Command Injection" },
  { value: "prompt_leaking", label: "Prompt Leaking" },
] as const

const VULNERABILITY_COLORS = {
  none: "bg-green-500",
  low: "bg-yellow-500",
  medium: "bg-orange-500",
  high: "bg-red-500",
  critical: "bg-red-700",
}

export function SecurityTestingSection() {
  const [loading, setLoading] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<SecurityAnalysisResult | null>(null)

  const handleProviderSelect = (value: string) => {
    if (selectedProviders.includes(value)) {
      setSelectedProviders(selectedProviders.filter(p => p !== value))
    } else {
      setSelectedProviders([...selectedProviders, value])
    }
  }

  const handleTestTypeSelect = (value: string) => {
    if (selectedTests.includes(value)) {
      setSelectedTests(selectedTests.filter(t => t !== value))
    } else {
      setSelectedTests([...selectedTests, value])
    }
  }

  const handleSubmit = async () => {
    if (!prompt || selectedProviders.length === 0 || selectedTests.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      const request: SecurityTestRequest = {
        prompt,
        test_types: selectedTests as InjectionTestType[],
        providers: selectedProviders,
      }
      const result = await evaluateSecurityTest(request)
      setResult(result)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to run security tests")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Prompt Injection Testing</CardTitle>
          <CardDescription>
            Test LLM resistance to various prompt injection techniques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Providers Selection */}
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

            {/* Test Types Selection */}
            <div>
              <Label>Select Test Types</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {INJECTION_TEST_TYPES.map((test) => (
                  <Button
                    key={test.value}
                    variant={selectedTests.includes(test.value) ? "default" : "outline"}
                    onClick={() => handleTestTypeSelect(test.value)}
                    size="sm"
                  >
                    {test.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="prompt">Base Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Enter the prompt to test..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                This prompt will be tested against different injection attacks
              </p>
            </div>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Run Security Tests
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <>
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Analysis Results</CardTitle>
                  <CardDescription>
                    Overall security score: {(result.overall_security_score * 100).toFixed(1)}%
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {result.overall_security_score >= 0.8 ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : result.overall_security_score >= 0.5 ? (
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Critical Findings */}
              {result.critical_findings.length > 0 && (
                <div className="rounded-lg border-2 border-red-500 p-4 bg-red-50">
                  <h4 className="font-medium text-red-700 mb-2">Critical Findings</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {result.critical_findings.map((finding, index) => (
                      <li key={index} className="text-sm text-red-600">{finding}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Summary */}
              <div>
                <h4 className="font-medium mb-2">Analysis Summary</h4>
                <p className="text-sm text-muted-foreground">{result.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Test Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {result.test_results.map((testResult, testIndex) => (
                  <AccordionItem key={testIndex} value={`test-${testIndex}`}>
                    <AccordionTrigger>
                      {testResult.provider}/{testResult.model}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {testResult.test_responses.map((response, responseIndex) => {
                          const analysis = result.analyses[testIndex * testResult.test_responses.length + responseIndex]
                          return (
                            <Card key={responseIndex}>
                              <CardHeader className="p-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">
                                    {response.test_type.replace(/_/g, " ").toUpperCase()}
                                  </h4>
                                  <Badge className={VULNERABILITY_COLORS[analysis.vulnerability_level]}>
                                    {analysis.vulnerability_level.toUpperCase()}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="space-y-2">
                                  <p className="text-sm"><strong>Injection:</strong> {response.injection_prompt}</p>
                                  <p className="text-sm"><strong>Response:</strong> {response.model_response}</p>
                                  <p className="text-sm"><strong>Analysis:</strong> {analysis.explanation}</p>
                                  {analysis.mitigation_suggestions.length > 0 && (
                                    <div>
                                      <p className="text-sm font-medium">Mitigation Suggestions:</p>
                                      <ul className="list-disc pl-4">
                                        {analysis.mitigation_suggestions.map((suggestion, i) => (
                                          <li key={i} className="text-sm text-muted-foreground">{suggestion}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}