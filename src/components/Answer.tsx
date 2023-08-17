import React, { useEffect, useState } from 'react';
import { Choice, QuestionInterface } from './QuestionList';

interface Props { 
  answer: Choice,
  setQuestionsList: React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
  selectedAnswerId: string,
  handleAnswerSelection: any,
  questionId: string,
  quizComplete: boolean,
  answersDisabled: boolean,
  answersSelectedCount: number,
  setAnswersSelectedCount: React.Dispatch<React.SetStateAction<number>>
}

const AnswerView: React.FC<Props> = ({ answer, setQuestionsList, questionId, selectedAnswerId, handleAnswerSelection, quizComplete, answersDisabled, setAnswersSelectedCount }) => {
  const [bgColor, setBgColor] = useState<string>('transparent');
  const [textOpacity, setTextOpacity] = useState<string>('1')

  const handleAnswerHeld = (aId: string) => {
    handleAnswerSelection(aId);

    setQuestionsList(prevList =>
      prevList.map(question => {
        if (question.questionId === questionId) {
          return {
            ...question,
            choices: question.choices.map((choice: Choice) => {
              if (choice.answerId === aId) {
                setAnswersSelectedCount(prevCount => prevCount + 1)
                return {
                  ...choice,
                  isSelected: true,
                };
              } else if (choice.answerId !== aId) {
                return {
                  ...choice,
                  isSelected: false
                };
              } else if (choice.isCorrect) {
                return {
                  ...choice,
                  backgroundColor: '#94D7A2',
                };
              }
              return choice;
            }),
          };
        }
        return question;
      })
    );
  };

  useEffect(() => {
    if (quizComplete) {
      if (answer.isCorrect) {
        if (answer.isSelected) {
          setBgColor('#94D7A2');
        }
        else{
          setBgColor('#94D7A2')
        } 
      } else if (answer.isSelected) {
        setBgColor('#F8BCBC');
        setTextOpacity('0.6') 
      } else {
        setBgColor('transparent');
        setTextOpacity('0.6')
      }
    } else {
      if (selectedAnswerId === answer.answerId) {
        setBgColor('#D6DBF5'); 
      } else {
        setBgColor('transparent');
      }
    }
  }, [selectedAnswerId, answer, quizComplete]);

  const answerStyle = {
    backgroundColor: bgColor || answer.backgroundColor,
    cursor: 'pointer'
  };

  return (
    <div onClick={() => !answersDisabled && handleAnswerHeld(answer.answerId)} style={answerStyle} className='mx-3 py-1 px-9 border-2 border-solid border-[#4D5B9E] border-opacity-50 rounded-2xl text-[10.2px] md:my-0 my-3'>
      <p style={{opacity: textOpacity}}>
        {answer.value}
      </p>
    </div>
  );
};

export default AnswerView;