"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquare, Zap, Brain, AlertCircle, Target } from "lucide-react"

export function QATestGuide() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <div>
            <CardTitle>Question Answering Evaluation</CardTitle>
            <CardDescription>
              Learn how to test LLM&apos;s question answering capabilities with context
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Before you begin</AlertTitle>
          <AlertDescription>
            Question answering testing evaluates how well an LLM can understand context and provide accurate,
            relevant answers to questions. Each test consists of context-question-answer triplets.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible>
          <AccordionItem value="what">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>What does it evaluate?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Answer Correctness</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Exact Match:</strong> Perfect alignment with expected answer</li>
                    <li><strong>F1 Score:</strong> Balance between precision and recall in answer content</li>
                    <li><strong>Semantic Matching:</strong> Understanding similar answers phrased differently</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Context Usage</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Context Relevance:</strong> How well the answer uses provided context</li>
                    <li><strong>Information Accuracy:</strong> Correctness of extracted information</li>
                    <li><strong>Answer Completeness:</strong> Coverage of all relevant context details</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>How to create tests?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-4">
                <li>
                  <span className="font-medium text-foreground">Select LLM Providers:</span> Choose 
                  which providers to test (e.g., ChatGPT, Llama).
                </li>
                <li>
                  <span className="font-medium text-foreground">Create Test Examples:</span>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li><strong>Context:</strong> The passage or information the LLM should use</li>
                    <li><strong>Question:</strong> What you want to ask about the context</li>
                    <li><strong>Expected Answer:</strong> The correct answer for comparison</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-foreground">Test Guidelines:</span>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li>Keep contexts concise but informative</li>
                    <li>Ask specific, unambiguous questions</li>
                    <li>Provide clear, definitive expected answers</li>
                    <li>Add multiple examples for thorough testing</li>
                  </ul>
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="results">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>Understanding Results</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Metrics</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>
                      <strong>Overall Exact Match (%):</strong> Percentage of answers matching exactly
                    </li>
                    <li>
                      <strong>F1 Score:</strong> Overall answer quality (1.0 = perfect, 0.0 = incorrect)
                      <ul className="mt-1 pl-4 list-disc">
                        <li>1.0: Perfect match (semantically equivalent)</li>
                        <li>0.8: Correct but with extra information</li>
                        <li>0.5: Partially correct</li>
                        <li>0.0: Incorrect</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Context Relevance:</strong> How well answers use the context
                      <ul className="mt-1 pl-4 list-disc">
                        <li>1.0: Fully supported by context</li>
                        <li>0.7-0.9: Mostly supported</li>
                        <li>0.4-0.6: Partially supported</li>
                        <li>0.0-0.3: Contradicts/ignores context</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Error Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    For any answer with F1 score below 0.7, detailed error analysis is provided showing:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    <li>Comparison between predicted and expected answers</li>
                    <li>Explanation of scoring decisions</li>
                    <li>Context usage analysis</li>
                    <li>Suggestions for improvement</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}