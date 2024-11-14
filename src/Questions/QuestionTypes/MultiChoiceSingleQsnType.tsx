type MultiChoiceSingleQsnProp = {
    answer:string,
    handleAnswer:(e : React.ChangeEvent<HTMLInputElement>)=>void
}
function MultiChoiceSingleQsnType( {answer,handleAnswer}:MultiChoiceSingleQsnProp ){
    return <input type='text' placeholder='Enter Answer' className='form-control text-center'
    value={answer}
    onChange={handleAnswer} />
}

export default MultiChoiceSingleQsnType;