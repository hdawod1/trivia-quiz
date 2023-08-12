import React, { useState } from 'react';
// import { Choice } from '../question-list/QuestionList';
// import { useDispatch } from 'react-redux';

interface Props { 
  answer: any,
  choices: any
}

const AnswerView: React.FC<Props> = ({ answer, choices }) => {

  const [bgColor, setBgColor] = useState<string>('transparent')

  const handleAnswerHeld = (aId: string) => {

    choices.map((a: any) => a.answerId === aId ? setBgColor('bg-slate-500'): setBgColor('transparent'))
    
  }

  const answerStyle = {
    backgroundColor: bgColor
  }
  
  

  return (
    <>
     <p style={answerStyle} onClick={() => handleAnswerHeld(answer.answerId)}>{answer.value}</p>
    </>
  );
};

export default AnswerView;
