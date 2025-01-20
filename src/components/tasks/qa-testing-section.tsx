"use client"

import { useState } from "react"
import { QATestForm } from "./qa-test-form"
import { QATestResults } from "./qa-test-results"
import { Button } from "@/components/ui/button"
import { QAExample, QATestResult } from "@/types/qa"

export function QATestingSection() {
  const [examples, setExamples] = useState<QAExample[]>([])
  const [results, setResults] = useState<QATestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const addExample = (example: QAExample) => {
    setExamples([...examples, example])
  }

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index))
  }

  const clearExamples = () => {
    setExamples([])
    setResults(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Test Examples</h3>
          <p className="text-sm text-muted-foreground">
            Add question-answer pairs to test the model
          </p>
        </div>
        <Button variant="outline" onClick={clearExamples}>
          Clear All
        </Button>
      </div>

      <QATestForm
        onAddExample={addExample}
        isLoading={isLoading}
      />

      {examples.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Added Examples ({examples.length})
            </h4>
          </div>
          <div className="divide-y divide-border rounded-md border">
            {examples.map((example, index) => (
              <div key={index} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Example {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExample(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="text-sm"><strong>Context:</strong> {example.context}</p>
                  <p className="text-sm"><strong>Question:</strong> {example.question}</p>
                  <p className="text-sm"><strong>Expected Answer:</strong> {example.correct_answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && <QATestResults results={results} />}
    </div>
  )
}