import { useState } from "react"
import React, {useEffect} from 'react'
import Question, { QuestionInterface } from "./Question.tsx"
import { nanoid } from "nanoid"

export interface Choice {
    answerId: string,
    value: string,
    isSelected: boolean,
    isCorrect: boolean
}

const QuestionList: React.FC = () => {
    const [questionsList, setQuestionsList] = useState<QuestionInterface[]>([]);

    const shuffle = (array: any) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const getQuestionList = async () => {
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
                choices: shuffle(options.map((option: Choice) => {
                    return {
                        value: option,
                        answerId: nanoid(),
                        isSelected: false,
                        isCorrect: false
                    }
                })),
                correctAnswer: question.correct_answer,
            }
            
        });

        setQuestionsList(mappedQuestions);
    };

    useEffect(() => {
        getQuestionList()
    }, [])

    const decodeString = (str: string) => {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    useEffect(() => {
        questionsList.map((question: any) => {
            console.log(question.choices)
        })
    }, [])

    return(
        <>
            {
                questionsList.map((question: QuestionInterface) => (
                    <Question key={question.questionId} question={question} choices={question.choices} />
                    
                ))
            }
        </>
    )
}

export default QuestionList