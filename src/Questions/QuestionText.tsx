import React from 'react'
import { questions } from '../questionsApi'



function QuestionText() {
  return <div className='question-content'>
            <p>Score { Math.round(scorePercentage) } %</p>
            <div className="card-body">
                <h5 className="card-title">Exam ({currentQuestionIndex + 1 } / { questions.length})</h5>
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
}

export default QuestionText