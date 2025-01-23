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
import { Brain, Zap, Target, AlertCircle, GitBranch } from "lucide-react"

export function ReasoningTestGuide() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          <div>
            <CardTitle>Reasoning Evaluation</CardTitle>
            <CardDescription>
              Test LLM&apos;s logical reasoning and problem-solving capabilities
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Before you begin</AlertTitle>
          <AlertDescription>
            Reasoning evaluation assesses how well an LLM can think logically, maintain consistency,
            and solve problems step by step. The analysis covers multiple aspects of reasoning quality.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible>
          <AccordionItem value="categories">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                <span>Evaluation Categories</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Logical Consistency</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    <li>Maintains coherent logical flow</li>
                    <li>Avoids contradictions</li>
                    <li>Draws valid conclusions from premises</li>
                    <li>Uses sound reasoning structure</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Step-by-Step Analysis</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    <li>Clear breakdown of reasoning process</li>
                    <li>Logical sequence of steps</li>
                    <li>Clear explanation of each step</li>
                    <li>Smooth transitions between steps</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Factual Accuracy</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    <li>Correctness of stated facts</li>
                    <li>Accuracy of examples used</li>
                    <li>Proper concept explanations</li>
                    <li>Absence of misrepresentations</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Relevance</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    <li>Direct address of the prompt</li>
                    <li>Information relevance</li>
                    <li>Pertinent examples</li>
                    <li>Avoidance of tangential content</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Completeness</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                    <li>Coverage of all prompt aspects</li>
                    <li>Comprehensive explanation</li>
                    <li>No significant omissions</li>
                    <li>Appropriate depth of analysis</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>How to Run Tests</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-4">
                <li>
                  <span className="font-medium text-foreground">Select Provider:</span> Choose the LLM provider to test.
                </li>
                <li>
                  <span className="font-medium text-foreground">Create Reasoning Prompt:</span>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li>Pose a problem requiring logical analysis</li>
                    <li>Ask for step-by-step explanation</li>
                    <li>Request specific conclusions</li>
                    <li>Consider providing additional context</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-foreground">Optional Parameters:</span>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li>Select specific categories to evaluate</li>
                    <li>Adjust maximum response length</li>
                    <li>Set temperature for response creativity</li>
                  </ul>
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="results">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Understanding Results</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Scoring System</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>Each category receives a score from 0 to 1</li>
                    <li><strong>0.8-1.0:</strong> Strong performance (counted as strength)</li>
                    <li><strong>0.6-0.8:</strong> Adequate performance</li>
                    <li><strong>Below 0.6:</strong> Needs improvement (counted as weakness)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Analysis Components</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>
                      <strong>Overall Score:</strong> Average across all categories
                    </li>
                    <li>
                      <strong>Category Scores:</strong> Detailed breakdowns with examples
                    </li>
                    <li>
                      <strong>Strengths/Weaknesses:</strong> Highlighted areas of performance
                    </li>
                    <li>
                      <strong>Improvement Suggestions:</strong> Recommendations for categories scoring below 0.7
                    </li>
                  </ul>
                </div>
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Results include the original LLM response and detailed
                    analysis for each reasoning category, helping you understand exactly how the
                    model approaches logical problem-solving.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}