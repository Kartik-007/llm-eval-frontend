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
  ReasoningAnalysis, 
  ReasoningTestRequest, 
  ReasoningCategory 
} from "@/types/reasoning"
import { analyzeReasoning, getReasoningCategories } from "@/lib/services/reasoning-service"
import { LLM_PROVIDERS } from "@/types/qa" // Reusing the providers from QA

export function ReasoningTestingSection() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [provider, setProvider] = useState<string>("openai")
  const [result, setResult] = useState<ReasoningAnalysis | null>(null)
  const [formData, setFormData] = useState<ReasoningTestRequest>({
    prompt: "",
    provider: "openai",
    additional_context: "",
    temperature: 0.7,
  })

  // Fetch available categories on component mount
  useEffect(() => {
    getReasoningCategories().then(setCategories).catch(console.error)
  }, [])

  const handleSubmit = async () => {
    if (!formData.prompt) {
      alert("Please enter a prompt")
      return
    }

    try {
      setLoading(true)
      const result = await analyzeReasoning({
        ...formData,
        provider,
      })
      setResult(result)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to analyze reasoning")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setFormData({
      prompt: "",
      provider: "openai",
      additional_context: "",
      temperature: 0.7,
    })
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reasoning Evaluation</CardTitle>
          <CardDescription>
            Test LLM&apos;s logical reasoning and problem-solving capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="provider">LLM Provider</Label>
              <Select
                value={provider}
                onValueChange={(value) => {
                  setProvider(value)
                  setFormData({ ...formData, provider: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {LLM_PROVIDERS.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Reasoning Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Enter the reasoning prompt or scenario..."
                className="min-h-[100px]"
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="Enter any additional context..."
                className="min-h-[100px]"
                value={formData.additional_context || ""}
                onChange={(e) =>
                  setFormData({ ...formData, additional_context: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Reasoning
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Reasoning analysis for {result.provider} model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Overall Score</CardTitle>
                  <p className="text-2xl font-bold">
                    {(result.overall_score * 100).toFixed(1)}%
                  </p>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Model Info</CardTitle>
                  <p className="text-sm">{result.model}</p>
                </CardHeader>
              </Card>
            </div>

            {/* Category Scores */}
            <div className="space-y-4">
              <h3 className="font-medium">Category Scores</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {result.category_scores.map((score) => (
                  <Card key={score.category}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">
                            {score.category.replace(/_/g, " ").toUpperCase()}
                          </p>
                          <span className="text-sm font-bold">
                            {(score.score * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {score.explanation}
                        </p>
                        {score.examples && score.examples.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Examples:</p>
                            <ul className="text-sm text-muted-foreground list-disc pl-4">
                              {score.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, i) => (
                      <li key={i} className="text-sm">
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weaknesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm">
                        • {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Improvement Suggestions */}
            {result.improvement_suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.improvement_suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm">
                        • {suggestion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Original Response */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LLM Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{result.tested_response}</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  )
}