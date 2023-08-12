import React from 'react';
import Answer from './Answer'
import { Choice } from './QuestionList';

interface Props {
  question: QuestionInterface,
  choices: Choice[]
}

export interface QuestionInterface {
  questionId: string;
  question: string;
  choices: any; 
  correctAnswer: string;
}

const Question: React.FC<Props> = ({ question, choices }) => {

  console.log(choices)
  

  return (
    
    <>
      <p>{question.question}</p>
      <>
          {
              choices.map((answer: any) => (
                  <Answer key={answer.answerId} answer={answer} choices={choices} />
              ))
          }
      </>
    </>
  );
};

export default Question