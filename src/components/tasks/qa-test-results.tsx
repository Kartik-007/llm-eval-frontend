import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QATestResult } from "@/types/qa"

interface QATestResultsProps {
  results: QATestResult
}

export function QATestResults({ results }: QATestResultsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Test Results</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Exact Match Score
                </dt>
                <dd className="text-2xl font-bold">
                  {(results.overall_exact_match * 100).toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  F1 Score
                </dt>
                <dd className="text-2xl font-bold">
                  {(results.overall_f1_score * 100).toFixed(1)}%
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Provider
                </dt>
                <dd className="font-medium">{results.provider}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Model
                </dt>
                <dd className="font-medium">{results.model}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Individual Results</h4>
        <div className="divide-y divide-border rounded-md border">
          {results.evaluations.map((evaluation, index) => (
            <div key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    evaluation.exact_match ? "bg-green-500" : "bg-yellow-500"
                  }`} />
                  <span className="text-sm font-medium">
                    Example {index + 1}
                  </span>
                </div>
                <p className="text-sm">
                  <strong>Predicted:</strong> {evaluation.predicted_answer}
                </p>
                <p className="text-sm">
                  <strong>Expected:</strong> {evaluation.correct_answer}
                </p>
                <p className="text-sm">
                  <strong>F1 Score:</strong> {(evaluation.f1_score * 100).toFixed(1)}%
                </p>
                {evaluation.explanation && (
                  <p className="text-sm text-muted-foreground">
                    {evaluation.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}