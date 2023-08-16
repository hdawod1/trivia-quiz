import React from 'react'

interface Props{
    setQuizReset: React.Dispatch<React.SetStateAction<boolean>>
}

const StartQuiz: React.FC<Props> = ({ setQuizReset }) => {

    return (
        <div className='relative top-[300px]'>
            <h1 className='text-[#293264] text-3xl font-bold'>Trivia Quiz</h1>
            <button className='my-12 bg-[#4D5B9E] text-[#F5F7FB] py-4 px-28 rounded-3xl' onClick={() => setQuizReset(false)}>Start quiz</button>
        </div>
    )
}

export default StartQuiz