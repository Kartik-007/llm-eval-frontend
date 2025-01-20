export interface QAExample {
    context: string
    question: string
    correct_answer: string
    answer_type?: string
    metadata?: Record<string, any>
  }
  
  export interface QAEvaluation {
    predicted_answer: string
    correct_answer: string
    exact_match: boolean
    f1_score: number
    context_relevance: number
    explanation?: string
  }
  
  export interface QATestResult {
    provider: string
    model: string
    evaluations: QAEvaluation[]
    overall_exact_match: number
    overall_f1_score: number
    average_relevance: number
    error_analysis?: string[]
  }