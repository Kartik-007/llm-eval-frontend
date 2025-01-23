"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityTestingSection } from "@/components/security/security-testing-section"
import { SecurityTestGuide } from "@/components/security/security-test-guide"

export default function SecurityTestingPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Security Testing
        </h1>
        <p className="text-muted-foreground">
          Evaluate LLM resistance to security attacks and prompt injections
        </p>
      </div>

      {/* Guide Section */}
      <SecurityTestGuide />

      {/* Main Content */}
      <Tabs defaultValue="injection" className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="injection">Prompt Injection</TabsTrigger>
        </TabsList>

        {/* Prompt Injection Tab */}
        <TabsContent value="injection" className="space-y-4">
          <SecurityTestingSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}