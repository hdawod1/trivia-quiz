import {configureStore} from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

const store = configureStore({
    reducer: rootReducer
})

// console.log('Initial State ', store.getState())

export type RootState = ReturnType<typeof store.getState>

export default store