import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export interface Choice{
    answerId: string,
    backgroundColor: string,
    value: string
}

export interface ChoicesState { answers: Choice[] }

const initialState: ChoicesState = {
    answers: []
}

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        receiveAnswerObjects: (state, action: PayloadAction<Choice []>) => { state.answers = action.payload },
        toggleAnswerBgColor: (
        state,
        action: PayloadAction<{ answerId: string }>
        ) => {
            const { answerId } = action.payload

            state.answers = state.answers.map((choice: Choice) => {
                if (choice.answerId === answerId) {
                    return {
                        ...choice, 
                        backgroundColor: 'lightgray',
                    }
                    
                }
                    return choice
            })
        },
    }
})

export const {receiveAnswerObjects, toggleAnswerBgColor} = answerSlice.actions
export const answerInitialState = answerSlice.getInitialState()

export default answerSlice.reducer