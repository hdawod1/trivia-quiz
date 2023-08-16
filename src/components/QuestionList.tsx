import { useState } from "react"
import React, {useEffect} from 'react'
import Question from "./Question.tsx"
import { nanoid } from "nanoid"
import {decode} from 'html-entities'

export interface QuestionInterface {
    questionId: string;
    question: string;
    choices: Choice[]; 
    correctAnswer: string
}

export interface Choice {
    answerId: string,
    value: string,
    isSelected: boolean,
    isCorrect: boolean,
    backgroundColor: string
}

interface Props {
    setQuizReset: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionList: React.FC<Props> = ({ setQuizReset }) => {
    const [questionsList, setQuestionsList] = useState<QuestionInterface[]>([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)
    const [quizComplete, setQuizComplete] = useState<boolean>(false)
    const [answersDisabled, setAnswersDisabled] = useState<boolean>(false)

    const shuffle = (array: any) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const getQuestionList = async () => {

        setQuestionsList([])
        setQuizComplete(false)
        setAnswersDisabled(false)
        setCorrectAnswersCount(0)

        const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await res.json();

        // Map the fetched data to the Question object structure
        const mappedQuestions = data.results.map((question: any) => {
            let options = [
                decode(question.correct_answer), 
                ...question.incorrect_answers.map((incorrectAnswer: string) => decode(incorrectAnswer))
            ]

            return {
                questionId: nanoid(),
                question: decode(question.question),
                choices: shuffle(options.map((option: Choice) => {
                    return {
                        value: option,
                        answerId: nanoid(),
                        isSelected: false,
                        isCorrect: option === question.correct_answer,
                        backgroundColor: 'transparent'
                    }
                })),
                correctAnswer: decode(question.correct_answer),
            }
            
        });

        setQuestionsList(mappedQuestions);
    };

    const checkAnswers = () => {
        let numOfCorrectAnswers = 0

        questionsList.forEach((question: QuestionInterface) => {
            question.choices.map((choice: Choice) => {
                if(choice.isSelected && choice.isCorrect){
                numOfCorrectAnswers++
                }
            })
        })

        setCorrectAnswersCount(numOfCorrectAnswers)
        
        setQuizComplete(true)

        setAnswersDisabled(true)
    }

    useEffect(() => {
        getQuestionList()
    }, [])

    useEffect(() => {
        console.log(questionsList)
    }, [questionsList])

    return (
        <>
            { questionsList ? (
                <div className="text-left">
                    <div> { questionsList.map((question: QuestionInterface) => (
                                <div>
                                    <Question 
                                        key={question.questionId} 
                                        question={question} 
                                        setQuestionsList={setQuestionsList} 
                                        choices={question.choices} 
                                        quizComplete={quizComplete}
                                        answersDisabled={answersDisabled}
                                    />
                                </div>
                            )) }
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        {quizComplete && <p className="text-[#293264] text-xs font-bold">You got {correctAnswersCount}/5 correct answers</p>}
                        <button className="mx-12 bg-[#4D5B9E] text-[#F5F7FB] text-[10.2px] font-semibold p-3 rounded-lg flex flex-col items-center justify-center" onClick={() => !quizComplete ? checkAnswers() : setQuizReset(true)}>{quizComplete ? 'Play Again' : 'Check Answers'}</button>
                    </div>
                </div>
                ) : ( <p>Loading New Questions...</p> )
            }
        </>
    )
}

export default QuestionList