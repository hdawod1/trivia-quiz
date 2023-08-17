import React, { useState } from 'react'
import './App.css'
import QuestionList from './components/QuestionList';
import StartQuiz from './pages/StartQuiz';

const App: React.FC = () => {

  const [quizInitial, setQuizInitial] = useState<boolean>(true)

  return (
    <>
      { quizInitial && <StartQuiz setQuizReset={setQuizInitial} /> }
      <div className='flex flex-col items-center justify-center md:relative md:top-[120px]'>
        { !quizInitial && <QuestionList /> }
      </div>
    </>
  );
};

export default App;
