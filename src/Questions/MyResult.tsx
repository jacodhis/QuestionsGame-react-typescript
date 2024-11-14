import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Button from './commons/Button';
// import 
import {results} from  '../questionsApi'
import PreviewIcon from '@mui/icons-material/Preview';


interface QuestionAnswers {
    question: string,
    correct_answer:string,
    choices: string[]
}


interface MyAnswers {
  question: QuestionAnswers,
  myAnswer : string | null
}
interface Markings{
    correct: number,
    wrong: number,
    unAsnwered: number,
}

interface Questions{
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer:string,
  choices: string[]
}


interface MarkingsProp {
    readonly totalQuestions:number,
    readonly markings: Markings,
    readonly myAnswers: MyAnswers[],
    readonly resetHandler:()=>void,
    readonly scorePercentage:number
}
 

function MyResult({ markings, myAnswers, resetHandler, totalQuestions,scorePercentage }: MarkingsProp) {

  const [showSingleQuestion,setShowSingleQuestion] = useState<boolean>(false)
  const [questionResult,setQuestionResult] = useState<Questions | null>(null)

 
 const setQuestionToShow = (question: string) => {
  setShowSingleQuestion(true)
  const getQuestion = results.find((qsn: Questions) => qsn.question === question);
  // You can now use `getQuestion` as needed
  setQuestionResult(getQuestion || null )
};



  const bgColor = {backgroundColor:'#3d434b'}
  
  const isReset = totalQuestions === myAnswers.length ? <Button onClick={() => resetHandler()} name={`Reset`} backgroundColor={ bgColor} /> 
  : <Button onClick={()  => resetHandler() } name={`Resume`} backgroundColor={bgColor} />
  
  return <>
    {!showSingleQuestion ?<div>

   
      
      <div className='d-flex justify-content-between '>
        <div>
           <div className='d-flex gap-1'>
            <p><b>Correct</b> : {markings.correct} </p>
            <p> <b>Wrong</b>: {markings.wrong}</p>
            <p><b>unAsnwered</b> : { markings.unAsnwered }</p>
            <p><b>Score Percentage</b> : {scorePercentage} %</p>
          </div>
        </div>
        <div>{isReset}</div>
      </div>


       <table className="table">
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">My Answer</th>
                <th scope="col">Correct Answer</th>
                <th>Marking</th>
                <th>View Question</th>
              </tr>
        </thead>
         <tbody>
         {myAnswers.map((answer,index) => (   
           
              <tr key={index}>
                <td>{answer.question.question}</td>
                <td>{answer.myAnswer}</td>
               <td>{answer.question.correct_answer}</td>
               <td>
                  { answer.question.correct_answer === answer.myAnswer ?
                  <DoneIcon  style={{color:"blue"}} /> : 
                  <CloseIcon style={{color:"red"}}/>  }
                </td>
                <td>
                  <span className="btn btn-primary"  onClick={() => setQuestionToShow(answer.question.question)}><PreviewIcon />
                  </span></td>
               
              </tr>
          
           
         ))}
           </tbody>

        </table>
     
    </div> :<div>
      <p>{questionResult?.question}</p>
       
       <p><Button onClick={()=>setShowSingleQuestion(false)} name={`Back`} /> </p>
    </div>}
    
  </>
}

export default MyResult