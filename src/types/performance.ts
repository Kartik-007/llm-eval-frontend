// src/types/performance.ts
export interface TokenMetrics {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
    tokens_per_second: number
  }
  
  export interface LatencyMetrics {
    average_latency: number
    min_latency: number
    max_latency: number
    std_deviation: number
    p90_latency: number
    p95_latency: number
  }
  
  export interface PerformanceTestResult {
    provider: string
    model: string
    prompt_size: number
    latency: LatencyMetrics
    token_metrics: TokenMetrics
    raw_measurements: number[]
  }
  
  export interface LatencyTestConfig {
    num_iterations: number
    prompt_sizes: number[]
    max_tokens: number
    warm_up_runs: number
  }
  
  export interface PerformanceTestRequest {
    providers: string[]
    models?: Record<string, string>
    test_config?: LatencyTestConfig
    base_prompt?: string
  }