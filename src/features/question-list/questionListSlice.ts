import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Choice } from '../answer/answerSlice';

export interface Question {
  questionId: string;
  question: string;
  choices: Choice[];
  correctAnswer: string;
}

interface QuestionsState {
  questions: Question[],
  allAnswersHeld: boolean
}

const initialState: QuestionsState = {
  questions: [],
  allAnswersHeld: false
};

const questionBankSlice = createSlice({
  name: 'questionBank',
  initialState,
  reducers: {
    populateQuestions: (state, action: PayloadAction<Question[]>) => { state.questions = action.payload },
  },
});

export const { populateQuestions } = questionBankSlice.actions;

export default questionBankSlice.reducer;