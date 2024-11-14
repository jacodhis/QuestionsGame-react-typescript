export interface Questions{
      type: string,
      difficulty: string,
      category: string,
      question: string,
      correct_answer:string,
      incorrect_answers: string[]
}

export interface QuestionAnswers {
    question: string,
    correct_answer:string,
    choices: string[]
}

