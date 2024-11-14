import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Button from './commons/Button';


interface QuestionAnswers {
    question: string,
    correct_answer:string,
    choices: string[]
}


interface MyAnswers {
  question: QuestionAnswers,
  myAnswer : string
}
interface Markings{
    correct: number,
    wrong: number,
    unAsnwered: number,
}


interface MarkingsProp {
    readonly totalQuestions:number,
    readonly markings: Markings,
    readonly myAnswers: MyAnswers[],
    readonly resetHandler:()=>void
}
 

function MyResult({ markings, myAnswers, resetHandler, totalQuestions }: MarkingsProp) {
  
  const isReset = totalQuestions === myAnswers.length ? <Button onClick={() => resetHandler()} name={`Reset`} /> : <Button onClick={() =>() => resetHandler() } name={`Resume`} />
  
  return <>
    <div>

   
      
      <div className='d-flex justify-content-between '>
        <div>
           <div className='d-flex gap-1'>
            <p><b>Correct</b> : {markings.correct} </p>
            <p> <b>Wrong</b>: {markings.wrong}</p>
            <p><b>unAsnwered</b> : { markings.unAsnwered }</p>
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
              </tr>
        </thead>
         <tbody>
         {myAnswers.map((answer,index) => (   
           
              <tr key={index}>
                <td>{answer.question.question}</td>
                <td>{answer.myAnswer}</td>
               <td>{answer.question.correct_answer}</td>
               <td>{ answer.question.correct_answer === answer.myAnswer ? <DoneIcon  style={{color:"blue"}} /> : <CloseIcon style={{color:"red"}}/>  }</td>
               
              </tr>
          
           
         ))}
           </tbody>

        </table>
     
    </div>
     {/* <p><Button onClick={resetHandler} name={`Reset`} /> </p> */}
  </>
}

export default MyResult