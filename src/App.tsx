import { useState } from 'react'
import './App.css'
import {results} from  './questionsApi'
import Button from './Questions/commons/Button'

import MyResult  from './Questions/MyResult';

interface QuestionAnswers {
    question: string,
    correct_answer:string,
    choices: string[]
}


interface Questions{

      type: string,
      difficulty: string,
      category: string,
      question: string,
      correct_answer:string,
      choices: string[]
}

interface Markings {
  correct: number,
  wrong: number,
  unAsnwered:number
}



interface MyAnswers {
  question: QuestionAnswers,
  myAnswer : string
}

function App() {

  
  const [questions, setQuestions] = useState<Questions[]>(results)
  // const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion = questions[currentQuestionIndex];

  const [answer, setAnswer] = useState<string>("")
  const [score, setScore] = useState<number>(0)
  const [scorePercentage, setScorePercentage] = useState<number>(0)
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false)
  
  const [myAnswers, setMyAnswers] = useState<MyAnswers[]>([])
  const [markings, setMarkings] = useState<Markings>({
    correct: 0,
    wrong: 0,
    unAsnwered:0
  })

  const questionBackground = <img src="../src/assets/question_image.jpg" className="card-img-top  " alt="..." style={{ height:'100%' }}/>
  

  const markThisQuestion = () => {
    const questionToMark = questions[currentQuestionIndex];
    if (answer.trim() !== "") {
        
          if (answer.trim() === questionToMark.correct_answer) {
            const myScore = score + 1;
            setScore(myScore)
            const percent: number = (myScore / questions.length) * 100;
            setScorePercentage(percent)
            markings.correct++
          } else {
            markings.wrong++
          }
        
          const question = questionToMark

          const  answeredQuestion : MyAnswers = {
            question: question,
            myAnswer:answer
          }
          const questionExists = myAnswers.some(question => question.question.question == questionToMark.question)
          if (!questionExists) {
            setMyAnswers([...myAnswers, answeredQuestion])
          } else {
            console.log("question exists")
          }

      } else {
          markings.unAsnwered++
      }
  }

  const previousHandler = () =>{
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }


  const nextHandler = () => {

   
    const questionsLength = questions.length;
    // const questionToMark = questions[currentQuestionIndex]
    if (currentQuestionIndex + 1 == questionsLength) {

      if (myAnswers.length === 0) {
        setCurrentQuestionIndex(0)
        setMarkings({
            correct: 0,
            wrong: 0,
            unAsnwered:0
        })
      } else {
        setIsLastQuestion(true)
      }

      markThisQuestion()
        
    } else {
      //mark the answer if the input has a value.if not just go next
        markThisQuestion()
        setAnswer("")
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
      
    
  }

  const resetHandler = () => {
    setIsLastQuestion(false)
    setScore(0)
    setScorePercentage(0)
    setMyAnswers([])
    setMarkings({
      correct: 0,
      wrong: 0,
      unAsnwered:0
    })

  }
  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAnswer(value)
  }
  const buttonToNext = currentQuestionIndex + 1 === questions.length ?
    <Button onClick={nextHandler} name={`Finish`} /> : <Button onClick={nextHandler} name={ `Next Question`} />


  const buttonPrevious = currentQuestionIndex !== 0 && <Button onClick={previousHandler} name={`Previous`} />
      
 
  const question = isLastQuestion ? <div>
      <MyResult markings={markings} myAnswers={myAnswers} resetHandler={resetHandler} totalQuestions={questions.length} />
    </div>
    : <div className="card" style={{ width: '50rem', padding: '0px' }}>
    <div className='img-container' style={{ height:' 250px' }}>
      {questionBackground}
    </div>
    <div className='question-content'>
      <p>Score { Math.round(scorePercentage) } %</p>
      <div className="card-body">
        <h5 className="card-title">Exam ({currentQuestionIndex + 1 }/{ questions.length})</h5>
      <p className="card-text">{currentQuestion.question || "No question available"}</p>
      <input type='text' placeholder='Enter Answer' className='form-control text-center'
      value={answer}
      onChange={handleAnswer} />
      
        <div className="d-flex justify-content-center gap-2">
          {buttonPrevious}

          {buttonToNext}
        </div>

        <div className="mt-2">
        <p> Subject : {currentQuestion.category} </p>
        <p> Difficulty Level :  {currentQuestion.difficulty}</p>
        </div>
      
      </div>
    </div>
    </div>
   
   
    


  if (!isLoading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  return  questions.length > 0 ? question : <p>No questions</p>;
 
  
}

export default App
