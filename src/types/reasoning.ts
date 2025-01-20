// src/types/reasoning.ts
export enum ReasoningCategory {
    LOGICAL_CONSISTENCY = "logical_consistency",
    STEP_BY_STEP = "step_by_step",
    FACTUAL_ACCURACY = "factual_accuracy",
    RELEVANCE = "relevance",
    COMPLETENESS = "completeness",
  }
  
  export interface ReasoningScore {
    category: ReasoningCategory
    score: number
    explanation: string
    examples?: string[]
  }
  
  export interface ReasoningAnalysis {
    overall_score: number
    category_scores: ReasoningScore[]
    strengths: string[]
    weaknesses: string[]
    improvement_suggestions: string[]
    original_prompt: string
    tested_response: string
    provider: string
    model: string
  }
  
  export interface ReasoningTestRequest {
    prompt: string
    provider: string
    model?: string
    categories?: ReasoningCategory[]
    max_tokens?: number
    temperature?: number
    additional_context?: string
  }