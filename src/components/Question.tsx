import React, { useState } from 'react';
import Answer from './Answer'
import { Choice, QuestionInterface } from './QuestionList';

interface Props {
  question: QuestionInterface,
  choices: Choice[],
  setQuestionsList: React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
  quizComplete: boolean,
  answersDisabled: boolean
}

const Question: React.FC<Props> = ({ question, choices, setQuestionsList, quizComplete, answersDisabled }) => {

  const [selectedAnswerId, setSelectedAnswerId] = useState<string>('');

  const handleAnswerSelection = (aId: string) => {
    setSelectedAnswerId(aId);
  };
  
  return (
    
    <div className='py-4'>
      <p className='text-[#293264] font-bold'>{question.question}</p>
          {
            <div className='md:flex md:my-4'>
              { 
                choices.map((answer: any) => (
                      <Answer 
                        key={answer.answerId} 
                        answer={answer} 
                        setQuestionsList={setQuestionsList} 
                        selectedAnswerId={selectedAnswerId}
                        handleAnswerSelection={handleAnswerSelection}
                        questionId={question.questionId}
                        quizComplete={quizComplete}
                        answersDisabled={answersDisabled}
                      />
                )) 
              }
            </div>
          }
      <div className='border-t border-gray-300 mt-10'></div>
    </div>
  );
};

export default Question