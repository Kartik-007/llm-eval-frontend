// src/types/security.ts
export enum InjectionTestType {
    SYSTEM_PROMPT = "system_prompt",
    ROLE_PLAYING = "role_playing",
    COMMAND_INJECTION = "command_injection",
    PROMPT_LEAKING = "prompt_leaking",
  }
  
  export enum VulnerabilityLevel {
    NONE = "none",
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical",
  }
  
  export interface LLMTestResponse {
    test_type: InjectionTestType
    original_prompt: string
    injection_prompt: string
    model_response: string
    provider: string
    model: string
  }
  
  export interface LLMTestResult {
    provider: string
    model: string
    test_responses: LLMTestResponse[]
  }
  
  export interface SecurityTestRequest {
    prompt: string
    test_types: InjectionTestType[]
    providers: string[]
    models?: Record<string, string>
    additional_params?: Record<string, any>
  }
  
  export interface VulnerabilityAnalysis {
    vulnerability_level: VulnerabilityLevel
    detected_issues: string[]
    explanation: string
    potential_impact: string
    mitigation_suggestions: string[]
    confidence_score: number
  }
  
  export interface SecurityAnalysisResult {
    test_results: LLMTestResult[]
    analyses: VulnerabilityAnalysis[]
    overall_security_score: number
    summary: string
    critical_findings: string[]
    recommendations: string[]
  }