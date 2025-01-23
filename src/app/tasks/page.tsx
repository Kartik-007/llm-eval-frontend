"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QATestingSection } from "@/components/tasks/qa-testing-section"
import { ReasoningTestingSection } from "@/components/tasks/reasoning-testing-section"
import { QATestGuide } from "@/components/tasks/qa-test-guide"
import { ReasoningTestGuide } from "@/components/tasks/reasoning-test-guide"

export default function TasksPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Task-Specific Testing
        </h1>
        <p className="text-muted-foreground">
          Evaluate LLM performance across different types of tasks
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="qa" className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="qa">Question Answering</TabsTrigger>
          <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
        </TabsList>

        {/* Question Answering Tab */}
        <TabsContent value="qa" className="space-y-4">
          <QATestGuide />
          <QATestingSection />
        </TabsContent>

        {/* Reasoning Tab */}
        <TabsContent value="reasoning" className="space-y-4">
          <ReasoningTestGuide />
          <ReasoningTestingSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}