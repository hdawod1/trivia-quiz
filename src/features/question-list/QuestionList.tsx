import { useDispatch } from "react-redux"
import { Question, populateQuestions } from "./questionListSlice.ts"
import { useEffect, useState } from "react"
import React from 'react'
import QuestionView from "../question/Question.tsx"
import { nanoid } from "nanoid"
// import { receiveAnswerObjects } from "../answer/answerSlice.ts"
// import { useAnswers } from "../answer/AnswerProvider.tsx"

const QuestionListView: React.FC = () => {
    const [questionsData, setQuestionsData] = useState<Question[]>([]);

    const dispatch = useDispatch();    

    // const { answersSet } = useAnswers()

    const getQuestionBank = async () => {
        const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await res.json();

        // Map the fetched data to the Question object structure
        const mappedQuestions = data.results.map((question: any) => {
            let options = [
                decodeString(question.correct_answer), 
                ...question.incorrect_answers.map((incorrectAnswer: string) => decodeString(incorrectAnswer))
            ]
            return {
                questionId: nanoid(),
                question: decodeString(question.question),
                choices: options,
                correctAnswer: question.correct_answer,
            }
            
        });

        setQuestionsData(mappedQuestions);
    };

    // dispatch(receiveAnswerObjects(answersSet))

    const decodeString = (str: string) => {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    useEffect(() => {
        getQuestionBank().then(() => {
          dispatch(populateQuestions(questionsData));
        });
      }, [dispatch]);

    return(
        <>
            {
                questionsData.map((question: Question) => (
                    <QuestionView key={question.questionId} question={question} choices={question.choices} />
                    
                ))
            }
        </>
    )
}

export default QuestionListView