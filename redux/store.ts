import { configureStore } from '@reduxjs/toolkit'

import user from './features/user/slice'
import production from './features/production/slice'
import productionStep from './features/production-step/slice'

export const store = configureStore({
    reducer: {
        user,
        production,
        productionStep
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

