import React, { useState } from 'react'
import './App.css'
import QuestionList from './components/QuestionList';
import StartQuiz from './pages/StartQuiz';

const App: React.FC = () => {

  const [quizReset, setQuizReset] = useState<boolean>(true)

  return (
    <>
      { quizReset && <StartQuiz setQuizReset={setQuizReset} /> }
      <div className='flex flex-col items-center justify-center md:relative md:top-[120px]'>
        { !quizReset && <QuestionList setQuizReset={setQuizReset} /> }
      </div>
    </>
  );
};

export default App;
