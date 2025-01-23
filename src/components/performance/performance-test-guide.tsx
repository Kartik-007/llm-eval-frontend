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
import { Timer, Zap, ChartBar, AlertCircle } from "lucide-react"

export function PerformanceTestGuide() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Timer className="h-6 w-6" />
          <div>
            <CardTitle>Understanding Performance Testing</CardTitle>
            <CardDescription>
              Learn how to evaluate LLM performance and interpret test metrics
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Before you begin</AlertTitle>
          <AlertDescription>
            Performance testing helps measure LLM response times and computational efficiency across different
            workloads. Tests are run multiple times to ensure reliable measurements.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible>
          <AccordionItem value="what">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                <span>What does it measure?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Response Time Metrics</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Average Latency:</strong> Mean response time across all test runs</li>
                    <li><strong>Min/Max Latency:</strong> Fastest and slowest response times</li>
                    <li><strong>Standard Deviation:</strong> Measure of response time variability</li>
                    <li><strong>Percentiles (90th, 95th):</strong> Response times for worst-case scenarios</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Token Processing Metrics</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Tokens per Second:</strong> Processing speed of the LLM</li>
                    <li><strong>Prompt Tokens:</strong> Number of tokens in the input</li>
                    <li><strong>Completion Tokens:</strong> Number of tokens in the response</li>
                    <li><strong>Total Tokens:</strong> Overall token usage per request</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>How to run tests?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-4">
                <li>
                  <span className="font-medium text-foreground">Select LLM Providers:</span> Choose 
                  providers to test (e.g., ChatGPT, Llama).
                </li>
                <li>
                  <span className="font-medium text-foreground">Set Test Parameters:</span>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li><strong>Number of Iterations:</strong> How many times to repeat each test (default: 5)</li>
                    <li><strong>Prompt Sizes:</strong> Different input lengths to test (default: 50, 100, 500 chars)</li>
                    <li><strong>Max Tokens:</strong> Maximum response length (default: 100)</li>
                    <li><strong>Warm-up Runs:</strong> Initial runs to stabilize performance (default: 1)</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-foreground">Customize Prompt (Optional):</span> Provide 
                  a custom prompt or use default prompts based on selected sizes.
                </li>
                <li>
                  <span className="font-medium text-foreground">Run Tests:</span> System will run 
                  multiple iterations and aggregate results.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="results">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                <span>Understanding Results</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Visual Analysis</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Response Time Chart:</strong> Shows how latency varies with prompt size</li>
                    <li><strong>Token Processing Chart:</strong> Displays processing speed trends</li>
                    <li><strong>Statistical Metrics:</strong> Visual comparison of min, max, and average times</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Performance Indicators</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>
                      <strong>Low Response Time + Low Deviation:</strong> Indicates consistent, fast performance
                    </li>
                    <li>
                      <strong>High Token Processing Rate:</strong> Shows efficient text generation
                    </li>
                    <li>
                      <strong>Close Min/Max Values:</strong> Suggests stable performance
                    </li>
                    <li>
                      <strong>Low Percentiles:</strong> Better worst-case performance
                    </li>
                  </ul>
                </div>
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Response times can vary based on network conditions, server load,
                    and model complexity. Multiple test runs help account for these variations.
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