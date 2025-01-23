// "use client"

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { LatencyTestingSection } from "@/components/performance/latency-testing-section"

// export default function PerformanceTestingPage() {
//   return (
//     <div className="container mx-auto p-6">
//       {/* Header Section */}
//       <div className="flex flex-col gap-2 mb-6">
//         <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
//           Performance Testing
//         </h1>
//         <p className="text-muted-foreground">
//           Evaluate response times and computational efficiency
//         </p>
//       </div>

//       {/* Main Content */}
//       <Tabs defaultValue="latency" className="flex flex-col gap-4">
//         <TabsList>
//           <TabsTrigger value="latency">Response Time</TabsTrigger>
//         </TabsList>

//         {/* Response Time Tab */}
//         <TabsContent value="latency" className="space-y-4">
//           <LatencyTestingSection />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LatencyTestingSection } from "@/components/performance/latency-testing-section"
import { PerformanceTestGuide } from "@/components/performance/performance-test-guide"

export default function PerformanceTestingPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Performance Testing
        </h1>
        <p className="text-muted-foreground">
          Evaluate response times and computational efficiency
        </p>
      </div>

      {/* Guide Section */}
      <PerformanceTestGuide />

      {/* Main Content */}
      <Tabs defaultValue="latency" className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="latency">Response Time</TabsTrigger>
        </TabsList>

        {/* Response Time Tab */}
        <TabsContent value="latency" className="space-y-4">
          <LatencyTestingSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}