// src/lib/services/reasoning-service.ts
import { ReasoningTestRequest, ReasoningAnalysis } from "@/types/reasoning"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function analyzeReasoning(request: ReasoningTestRequest): Promise<ReasoningAnalysis> {
  const response = await fetch(`${API_BASE_URL}/api/performance/reasoning`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to analyze reasoning")
  }

  return response.json()
}

export async function getReasoningCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/performance/reasoning/categories`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch reasoning categories")
  }

  return response.json()
}