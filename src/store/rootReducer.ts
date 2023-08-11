import {combineReducers} from '@reduxjs/toolkit'
import questionBankSlice from '../features/question-list/questionListSlice'
import answerSlice from '../features/answer/answerSlice'

export const rootReducer = combineReducers({
    questions: questionBankSlice,
    answers: answerSlice
})