import React from 'react'
import './App.css'
import QuestionList from './components/QuestionList';

const App: React.FC = () => {

  return (
    <div className='flex flex-col items-center justify-center relative top-[120px]'>
      <QuestionList />
    </div>
  );
};

export default App;
