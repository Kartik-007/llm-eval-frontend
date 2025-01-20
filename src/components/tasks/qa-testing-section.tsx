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
import { QAExample, QATestResult, LLM_PROVIDERS } from "@/types/qa"
import { evaluateQA } from "@/lib/services/qa-service"
import { Loader2 } from "lucide-react"

export function QATestingSection() {
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<string>("openai")
  const [examples, setExamples] = useState<QAExample[]>([])
  const [result, setResult] = useState<QATestResult | null>(null)
  const [currentExample, setCurrentExample] = useState<QAExample>({
    context: "",
    question: "",
    correct_answer: "",
  })

  const handleAddExample = () => {
    if (!currentExample.context || !currentExample.question || !currentExample.correct_answer) {
      alert("Please fill in all fields before adding an example.")
      return
    }

    setExamples([...examples, currentExample])
    setCurrentExample({
      context: "",
      question: "",
      correct_answer: "",
    })
  }

  const handleClearAll = () => {
    setExamples([])
    setResult(null)
  }

  const handleEvaluate = async () => {
    if (examples.length === 0) {
      alert("Please add at least one example before evaluating.")
      return
    }

    try {
      setLoading(true)
      const result = await evaluateQA(provider, null, examples)
      setResult(result)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to evaluate examples")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Question Answering Evaluation</CardTitle>
          <CardDescription>Test LLM&apos;s question answering capabilities using context-based examples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="provider">LLM Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="context">Context</Label>
                <Textarea
                  id="context"
                  placeholder="Enter the context for the question..."
                  className="min-h-[100px]"
                  value={currentExample.context}
                  onChange={(e) =>
                    setCurrentExample({ ...currentExample, context: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    placeholder="Enter your question..."
                    value={currentExample.question}
                    onChange={(e) =>
                      setCurrentExample({ ...currentExample, question: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected-answer">Expected Answer</Label>
                  <Input
                    id="expected-answer"
                    placeholder="Enter the expected answer..."
                    value={currentExample.correct_answer}
                    onChange={(e) =>
                      setCurrentExample({
                        ...currentExample,
                        correct_answer: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={handleAddExample}>Add Example</Button>
              {examples.length > 0 && (
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleClearAll}>
                    Clear All
                  </Button>
                  <Button onClick={handleEvaluate} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Evaluate
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Examples List */}
          {examples.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Added Examples ({examples.length})</h3>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        Example {index + 1}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Context:</span>{" "}
                          {example.context}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Question:</span>{" "}
                          {example.question}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Expected Answer:</span>{" "}
                          {example.correct_answer}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Results</CardTitle>
            <CardDescription>
              Results from testing {result.evaluations.length} examples on {result.provider}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Exact Match</CardTitle>
                  <p className="text-2xl font-bold">
                    {(result.overall_exact_match * 100).toFixed(1)}%
                  </p>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">F1 Score</CardTitle>
                  <p className="text-2xl font-bold">
                    {(result.overall_f1_score * 100).toFixed(1)}%
                  </p>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Context Relevance</CardTitle>
                  <p className="text-2xl font-bold">
                    {(result.average_relevance * 100).toFixed(1)}%
                  </p>
                </CardHeader>
              </Card>
            </div>

            {/* Individual Results */}
            <div className="space-y-4">
              <h3 className="font-medium">Detailed Results</h3>
              {result.evaluations.map((evaluation, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Example {index + 1}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            F1: {(evaluation.f1_score * 100).toFixed(1)}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Relevance: {(evaluation.context_relevance * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Predicted:</span>{" "}
                        {evaluation.predicted_answer}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Expected:</span>{" "}
                        {evaluation.correct_answer}
                      </p>
                      {evaluation.explanation && (
                        <p className="text-sm text-muted-foreground">
                          {evaluation.explanation}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Error Analysis */}
            {result.error_analysis && result.error_analysis.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Error Analysis</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {result.error_analysis.map((error, index) => (
                        <p key={index} className="text-sm text-red-500">
                          {error}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}