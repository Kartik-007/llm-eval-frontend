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
import { AlertCircle, Shield, Zap, Target } from "lucide-react"

export function SecurityTestGuide() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <div>
            <CardTitle>Understanding Security Testing</CardTitle>
            <CardDescription>
              Learn how to evaluate LLM security and understand test results
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Before you begin</AlertTitle>
          <AlertDescription>
            Security testing helps identify vulnerabilities in LLM systems. These tests simulate various
            attack scenarios to assess how well the LLM maintains its security boundaries.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible>
          <AccordionItem value="what">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>What does it test?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <h4 className="font-medium">System Prompt Injection</h4>
                  <p className="text-sm text-muted-foreground">
                    Attempts to bypass system-level instructions and access the LLM's base configuration.
                    Tests if the model can maintain its core security boundaries.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Role Playing Attack</h4>
                  <p className="text-sm text-muted-foreground">
                    Tries to make the LLM assume harmful personas or bypass safety guidelines through
                    role-playing scenarios. Tests behavioral consistency.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Command Injection</h4>
                  <p className="text-sm text-muted-foreground">
                    Attempts to make the LLM execute system commands or perform unauthorized actions.
                    Tests command processing boundaries.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Prompt Leaking</h4>
                  <p className="text-sm text-muted-foreground">
                    Tries to extract confidential information about the LLM's training or configuration.
                    Tests information security.
                  </p>
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
                  <span className="font-medium text-foreground">Select LLM Providers:</span> Choose one
                  or more LLM providers to test (e.g., ChatGPT, Llama).
                </li>
                <li>
                  <span className="font-medium text-foreground">Choose Test Types:</span> Select which
                  security tests to run. Each test type evaluates different aspects of LLM security.
                </li>
                <li>
                  <span className="font-medium text-foreground">Enter Base Prompt:</span> Provide the
                  prompt you want to test. This should be a typical prompt you'd use in your
                  application.
                </li>
                <li>
                  <span className="font-medium text-foreground">Run Tests:</span> The system will
                  automatically generate and run various injection attempts based on your selections.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="results">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Understanding Results</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Vulnerability Levels</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span><strong>None:</strong> No security issues detected</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span><strong>Low:</strong> Minor vulnerabilities with limited impact</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span><strong>Medium:</strong> Notable vulnerabilities requiring attention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span><strong>High:</strong> Serious vulnerabilities needing immediate action</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-700" />
                      <span><strong>Critical:</strong> Severe security breaches requiring urgent fixes</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Test Results Include</h4>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                    <li>Overall security score and posture assessment</li>
                    <li>Detailed analysis of each test response</li>
                    <li>Critical findings that need immediate attention</li>
                    <li>Specific vulnerabilities detected in each test</li>
                    <li>Mitigation suggestions and recommendations</li>
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