import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PerformanceTestingPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Performance Testing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Coming soon...
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reasoning Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  )
}