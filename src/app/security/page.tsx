import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecurityTestingPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Security Testing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Prompt Injection Testing</CardTitle>
          </CardHeader>
          <CardContent>
            Coming soon...
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Adversarial Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Coming soon...
          </CardContent>
        </Card>
      </div>
    </div>
  )
}