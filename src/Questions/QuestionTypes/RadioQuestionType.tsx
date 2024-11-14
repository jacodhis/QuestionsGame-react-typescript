import { Questions } from "../interfaces/QuestionsInterface";

type CurrentQuestionProp = {
    question:Questions,
    handleAnswer:(e: React.ChangeEvent<HTMLInputElement>)=>void
}
function RadioQuestionType({question,handleAnswer}:CurrentQuestionProp){

    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) =>{
        handleAnswer(e)
    }

    return <div>
    {question.choices.map((choice,index)=>(
      <div key={index}>
        <input type='radio' radioGroup='radio' value={choice} name="radioGroup" onChange={handleChangeAnswer}/> {choice}
        
      </div>
    ))}
    
    </div>

}

export default RadioQuestionType;