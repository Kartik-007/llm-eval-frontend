// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { QATestingSection } from "@/components/tasks/qa-testing-section"

// export default function TasksPage() {
//   return (
//     <div className="container mx-auto p-6">
//       {/* Header Section */}
//       <div className="flex flex-col gap-2 mb-6">
//         <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
//           Task-Specific Testing
//         </h1>
//         <p className="text-muted-foreground">
//           Evaluate LLM performance across different types of tasks
//         </p>
//       </div>

//       {/* Main Content */}
//       <Tabs defaultValue="qa" className="flex flex-col gap-4">
//         <TabsList>
//           <TabsTrigger value="qa">Question Answering</TabsTrigger>
//           <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
//         </TabsList>

//         {/* Question Answering Tab */}
//         <TabsContent value="qa" className="space-y-4">
//           <QATestingSection />
//         </TabsContent>

//         {/* Reasoning Tab */}
//         <TabsContent value="reasoning" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Reasoning Evaluation</CardTitle>
//               <CardDescription>
//                 Test LLM&apos;s logical reasoning and problem-solving capabilities
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Reasoning Test Examples Section - To be implemented */}
//               <div className="p-4 bg-muted rounded-lg text-center">
//                 <p className="text-sm text-muted-foreground">
//                   Reasoning evaluation functionality coming soon...
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QATestingSection } from "@/components/tasks/qa-testing-section"
import { ReasoningTestingSection } from "@/components/tasks/reasoning-testing-section"

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
          <QATestingSection />
        </TabsContent>

        {/* Reasoning Tab */}
        <TabsContent value="reasoning" className="space-y-4">
          <ReasoningTestingSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}