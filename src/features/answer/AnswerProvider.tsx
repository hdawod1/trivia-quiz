import React, { useState, useContext } from 'react';
import AnswerContext from './AnswerContext';

const AnswerProvider = ({ children }: { children: React.ReactNode }) => {

  const [answersSet, setAnswersSet] = useState<any[]>([]);

  return (
    <AnswerContext.Provider value={{ answersSet, setAnswersSet }}>
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswers = () => {
  const { answersSet, setAnswersSet } = useContext(AnswerContext);
  
  const updateAnswersSet = (newAnswersSet: any) => {
    setAnswersSet((prevAnswersSet: any) => prevAnswersSet = newAnswersSet);
  };

  return {
    answersSet,
    updateAnswersSet
  };
};

export default AnswerProvider