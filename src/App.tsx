import React, {useContext} from 'react'
import './App.css'
import QuestionListView from './features/question-list/QuestionList';
import AnswerContext from './features/answer/AnswerContext';
import { receiveAnswerObjects } from './features/answer/answerSlice';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {

  const dispatch = useDispatch()

  const { answersSet } = useContext(AnswerContext)

  dispatch(receiveAnswerObjects(answersSet))

  return (
    <div>
      <QuestionListView />
    </div>
  );
};

export default App;
