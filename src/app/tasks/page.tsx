// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"

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
//           <Card>
//             <CardHeader>
//               <CardTitle>Question Answering Evaluation</CardTitle>
//               <CardDescription>
//                 Test LLM&apos;s question answering capabilities using context-based examples
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* QA Test Examples Section */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-medium">Test Examples</h3>
//                   <Button variant="outline" size="sm">Clear All</Button>
//                 </div>
                
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="context">Context</Label>
//                     <Textarea
//                       id="context"
//                       placeholder="Enter the context for the question..."
//                       className="min-h-[100px]"
//                     />
//                   </div>
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="question">Question</Label>
//                       <Input id="question" placeholder="Enter your question..." />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="expected-answer">Expected Answer</Label>
//                       <Input id="expected-answer" placeholder="Enter the expected answer..." />
//                     </div>
//                   </div>
//                 </div>

//                 <Button>Add Example</Button>
//               </div>
//             </CardContent>
//           </Card>
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
//               {/* Reasoning Test Examples Section */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-medium">Test Examples</h3>
//                   <Button variant="outline" size="sm">Clear All</Button>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="scenario">Scenario</Label>
//                     <Textarea
//                       id="scenario"
//                       placeholder="Describe the reasoning scenario or problem..."
//                       className="min-h-[100px]"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="question">Question</Label>
//                     <Input 
//                       id="question" 
//                       placeholder="What do you want the LLM to reason about?"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="expected-reasoning">Expected Reasoning Steps</Label>
//                     <Textarea
//                       id="expected-reasoning"
//                       placeholder="Enter the expected reasoning steps or solution process..."
//                       className="min-h-[100px]"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="expected-conclusion">Expected Conclusion</Label>
//                     <Input 
//                       id="expected-conclusion" 
//                       placeholder="What should be the final conclusion?"
//                     />
//                   </div>
//                 </div>

//                 <Button>Add Example</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QATestingSection } from "@/components/tasks/qa-testing-section"

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
          <Card>
            <CardHeader>
              <CardTitle>Reasoning Evaluation</CardTitle>
              <CardDescription>
                Test LLM&apos;s logical reasoning and problem-solving capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reasoning Test Examples Section - To be implemented */}
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Reasoning evaluation functionality coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}