// src/lib/services/latency-service.ts
import { PerformanceTestRequest, PerformanceTestResult, LatencyTestConfig } from "@/types/performance"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function testLatency(request: PerformanceTestRequest): Promise<Record<string, PerformanceTestResult[]>> {
  const response = await fetch(`${API_BASE_URL}/api/performance/latency`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to run latency tests")
  }

  return response.json()
}

export async function getDefaultConfig(): Promise<LatencyTestConfig> {
  const response = await fetch(`${API_BASE_URL}/api/performance/config/default`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch default configuration")
  }

  return response.json()
}