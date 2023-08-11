import React from 'react';
import { useDispatch } from 'react-redux';
import { Choice, toggleAnswerBgColor } from './answerSlice';

interface Props { answer: Choice }

const AnswerView: React.FC<Props> = ({ answer }) => {

  const dispatch = useDispatch();

  const handleBgColor = () => {
    console.log(answer.value, answer.backgroundColor)
    dispatch(toggleAnswerBgColor({ answerId: answer.answerId }))
    
  };

  const answerStyles = {
    backgroundColor: answer.backgroundColor,
    cursor: 'pointer'
  }

  return (
    <>
     <p style={answerStyles} onClick={ handleBgColor }>{answer.value}</p> 
    </>
  );
};

export default AnswerView;
