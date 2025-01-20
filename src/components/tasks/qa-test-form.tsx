"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { QAExample } from "@/types/qa"

interface QATestFormProps {
  onAddExample: (example: QAExample) => void
  isLoading: boolean
}

export function QATestForm({ onAddExample, isLoading }: QATestFormProps) {
  const [context, setContext] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (context && question && answer) {
      onAddExample({
        context,
        question,
        correct_answer: answer
      })
      
      // Clear form
      setContext("")
      setQuestion("")
      setAnswer("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Context</label>
        <Textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter the context for the question..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Question</label>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Expected Answer</label>
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the correct answer..."
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !context || !question || !answer}
      >
        Add Example
      </Button>
    </form>
  )
}