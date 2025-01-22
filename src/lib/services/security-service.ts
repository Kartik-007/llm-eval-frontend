// src/lib/services/security-service.ts
import { SecurityTestRequest, SecurityAnalysisResult } from "@/types/security"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function evaluateSecurityTest(request: SecurityTestRequest): Promise<SecurityAnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/api/security/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to evaluate security")
  }

  return response.json()
}

export async function getTestTypes(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/security/test-types`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch test types")
  }

  return response.json()
}