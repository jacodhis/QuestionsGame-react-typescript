export interface Questions{
      type: string,
      difficulty: string,
      category: string,
      question: string,
      correct_answer:string,
      choices: string[]
}

export interface QuestionAnswers {
    question: string,
    correct_answer:string,
    choices: string[]
}

export interface QuestionRadioType{
    choice:boolean[]
}

export interface QuestionMulitChoiceType{
    choices:[]
}
