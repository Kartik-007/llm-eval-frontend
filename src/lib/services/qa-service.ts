// src/lib/services/qa-service.ts
import { QAExample, QATestResult } from "@/types/qa"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function evaluateQA(
  provider: string,
  model: string | null,
  examples: QAExample[]
): Promise<QATestResult> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/qa/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      provider,
      model,
      examples,
      max_tokens: 100,
      temperature: 0,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to evaluate QA")
  }

  return response.json()
}