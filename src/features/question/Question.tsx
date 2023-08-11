import React from 'react';
import { Question } from '../question-list/questionListSlice';
import AnswerView from '../answer/Answer'
import { Choice } from '../answer/answerSlice';
import { nanoid } from 'nanoid';
// import AnswerContext from '../answer/AnswerContext';

interface Props {
  question: Question,
  choices: any
}

const QuestionView: React.FC<Props> = ({ question, choices }) => {

  // const { setAnswersSet } = useContext(AnswerContext)

  const shuffle = (array: Choice[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const answers = choices.map((choice: Choice) => {
    return {
      answerId: nanoid(),
      backgroundColor: 'transparent',
      value: choice
    }
  })

  // setAnswersSet(answers)
  
  const shuffledAnswers = shuffle(answers)

  return (
    
    <>
      <p>{question.question}</p>
      <>
          {
              shuffledAnswers.map((answer: Choice) => (
                  <AnswerView key={answer.answerId} answer={answer} />
              ))
          }
      </>
    </>
  );
};

export default QuestionView;