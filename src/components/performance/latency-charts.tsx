// "use client"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts"
// import { PerformanceTestResult } from "@/types/performance"

// interface LatencyChartsProps {
//   results: Record<string, PerformanceTestResult[]>
// }

// export function LatencyCharts({ results }: LatencyChartsProps) {
//   // Transform data for latency vs prompt size chart
//   const latencyData = Object.entries(results).reduce((acc, [provider, providerResults]) => {
//     providerResults.forEach((result) => {
//       const existingEntry = acc.find(entry => entry.promptSize === result.prompt_size)
//       if (existingEntry) {
//         existingEntry[provider] = result.latency.average_latency
//       } else {
//         acc.push({
//           promptSize: result.prompt_size,
//           [provider]: result.latency.average_latency,
//         })
//       }
//     })
//     return acc
//   }, [] as any[]).sort((a, b) => a.promptSize - b.promptSize)

//   // Transform data for tokens/s vs prompt size chart
//   const tokensData = Object.entries(results).reduce((acc, [provider, providerResults]) => {
//     providerResults.forEach((result) => {
//       const existingEntry = acc.find(entry => entry.promptSize === result.prompt_size)
//       if (existingEntry) {
//         existingEntry[provider] = result.token_metrics.tokens_per_second
//       } else {
//         acc.push({
//           promptSize: result.prompt_size,
//           [provider]: result.token_metrics.tokens_per_second,
//         })
//       }
//     })
//     return acc
//   }, [] as any[]).sort((a, b) => a.promptSize - b.promptSize)

//   // Transform data for statistical metrics
//   const getStatisticalData = (providerResults: PerformanceTestResult[]) => {
//     return providerResults.map((result) => ({
//       promptSize: result.prompt_size,
//       average: result.latency.average_latency,
//       min: result.latency.min_latency,
//       max: result.latency.max_latency,
//       p90: result.latency.p90_latency,
//       p95: result.latency.p95_latency,
//     }))
//   }

//   // Generate random colors for providers
//   const colors = [
//     "#2563eb", // blue-600
//     "#dc2626", // red-600
//     "#16a34a", // green-600
//     "#9333ea", // purple-600
//   ]

//   return (
//     <div className="space-y-6">
//       {/* Latency vs Prompt Size */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Response Time by Prompt Size</CardTitle>
//           <CardDescription>Average latency for different prompt sizes</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={latencyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="promptSize"
//                   label={{ value: 'Prompt Size (chars)', position: 'bottom' }}
//                 />
//                 <YAxis label={{ value: 'Response Time (s)', angle: -90, position: 'left' }} />
//                 <Tooltip />
//                 <Legend />
//                 {Object.keys(results).map((provider, index) => (
//                   <Line
//                     key={provider}
//                     type="monotone"
//                     dataKey={provider}
//                     stroke={colors[index % colors.length]}
//                     name={provider}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tokens/s vs Prompt Size */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Token Processing Speed</CardTitle>
//           <CardDescription>Tokens per second for different prompt sizes</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={tokensData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="promptSize"
//                   label={{ value: 'Prompt Size (chars)', position: 'bottom' }}
//                 />
//                 <YAxis label={{ value: 'Tokens/Second', angle: -90, position: 'left' }} />
//                 <Tooltip />
//                 <Legend />
//                 {Object.keys(results).map((provider, index) => (
//                   <Line
//                     key={provider}
//                     type="monotone"
//                     dataKey={provider}
//                     stroke={colors[index % colors.length]}
//                     name={provider}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Statistical Metrics for each provider */}
//       {Object.entries(results).map(([provider, providerResults], index) => (
//         <Card key={provider}>
//           <CardHeader>
//             <CardTitle>{provider} - Statistical Metrics</CardTitle>
//             <CardDescription>Response time statistics by prompt size</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={getStatisticalData(providerResults)} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="promptSize"
//                     label={{ value: 'Prompt Size (chars)', position: 'bottom' }}
//                   />
//                   <YAxis label={{ value: 'Response Time (s)', angle: -90, position: 'left' }} />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="min" name="Min" fill="#16a34a" />
//                   <Bar dataKey="average" name="Average" fill="#2563eb" />
//                   <Bar dataKey="p90" name="90th Percentile" fill="#9333ea" />
//                   <Bar dataKey="p95" name="95th Percentile" fill="#dc2626" />
//                   <Bar dataKey="max" name="Max" fill="#f97316" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { PerformanceTestResult } from "@/types/performance"

interface LatencyChartsProps {
  results: Record<string, PerformanceTestResult[]>
}

export function LatencyCharts({ results }: LatencyChartsProps) {
  // Transform data for latency vs prompt size chart
  const latencyData = Object.entries(results).reduce((acc, [provider, providerResults]) => {
    providerResults.forEach((result) => {
      const existingEntry = acc.find(entry => entry.promptSize === result.prompt_size)
      if (existingEntry) {
        existingEntry[provider] = result.latency.average_latency
      } else {
        acc.push({
          promptSize: result.prompt_size,
          [provider]: result.latency.average_latency,
        })
      }
    })
    return acc
  }, [] as any[]).sort((a, b) => a.promptSize - b.promptSize)

  // Transform data for tokens/s vs prompt size chart
  const tokensData = Object.entries(results).reduce((acc, [provider, providerResults]) => {
    providerResults.forEach((result) => {
      const existingEntry = acc.find(entry => entry.promptSize === result.prompt_size)
      if (existingEntry) {
        existingEntry[provider] = result.token_metrics.tokens_per_second
      } else {
        acc.push({
          promptSize: result.prompt_size,
          [provider]: result.token_metrics.tokens_per_second,
        })
      }
    })
    return acc
  }, [] as any[]).sort((a, b) => a.promptSize - b.promptSize)

  // Transform data for statistical metrics
  const getStatisticalData = (providerResults: PerformanceTestResult[]) => {
    return providerResults.map((result) => ({
      promptSize: result.prompt_size,
      average: result.latency.average_latency,
      min: result.latency.min_latency,
      max: result.latency.max_latency,
      p90: result.latency.p90_latency,
      p95: result.latency.p95_latency,
    }))
  }

  // Colors for line charts
  const colors = [
    "#2563eb", // blue-600
    "#dc2626", // red-600
    "#16a34a", // green-600
    "#9333ea", // purple-600
  ]

  // Grayscale colors for bar charts
  const grayScaleColors = [
    "#18181b", // zinc-900
    "#3f3f46", // zinc-700
    "#71717a", // zinc-500
    "#a1a1aa", // zinc-400
    "#d4d4d8", // zinc-300
  ]

  return (
    <div className="space-y-6">
      {/* Latency vs Prompt Size */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time by Prompt Size</CardTitle>
          <CardDescription>Average latency for different prompt sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={latencyData} 
                margin={{ top: 20, right: 30, bottom: 60, left: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="promptSize"
                  label={{ 
                    value: 'Prompt Size (chars)', 
                    position: 'insideBottom', 
                    offset: -40
                  }}
                />
                <YAxis 
                  label={{ 
                    value: 'Response Time (s)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -40
                  }} 
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {Object.keys(results).map((provider, index) => (
                  <Line
                    key={provider}
                    type="monotone"
                    dataKey={provider}
                    stroke={colors[index % colors.length]}
                    name={provider}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tokens/s vs Prompt Size */}
      <Card>
        <CardHeader>
          <CardTitle>Token Processing Speed</CardTitle>
          <CardDescription>Tokens per second for different prompt sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={tokensData} 
                margin={{ top: 20, right: 30, bottom: 60, left: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="promptSize"
                  label={{ 
                    value: 'Prompt Size (chars)', 
                    position: 'insideBottom', 
                    offset: -40
                  }}
                />
                <YAxis 
                  label={{ 
                    value: 'Tokens/Second', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -40
                  }} 
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {Object.keys(results).map((provider, index) => (
                  <Line
                    key={provider}
                    type="monotone"
                    dataKey={provider}
                    stroke={colors[index % colors.length]}
                    name={provider}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Statistical Metrics for each provider */}
      {Object.entries(results).map(([provider, providerResults], index) => (
        <Card key={provider}>
          <CardHeader>
            <CardTitle>{provider} - Statistical Metrics</CardTitle>
            <CardDescription>Response time statistics by prompt size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={getStatisticalData(providerResults)} 
                  margin={{ top: 20, right: 30, bottom: 60, left: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="promptSize"
                    label={{ 
                      value: 'Prompt Size (chars)', 
                      position: 'insideBottom', 
                      offset: -40
                    }}
                  />
                  <YAxis 
                    label={{ 
                      value: 'Response Time (s)', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -40
                    }} 
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="min" name="Min" fill={grayScaleColors[4]} />
                  <Bar dataKey="average" name="Average" fill={grayScaleColors[3]} />
                  <Bar dataKey="p90" name="90th Percentile" fill={grayScaleColors[2]} />
                  <Bar dataKey="p95" name="95th Percentile" fill={grayScaleColors[1]} />
                  <Bar dataKey="max" name="Max" fill={grayScaleColors[0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}