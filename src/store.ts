import { configureStore } from '@reduxjs/toolkit'
import { concertApi } from './services/concertApi'
import concertSlice from './slices/concertSlice'


export const store = configureStore({
    reducer: {
        'concert': concertSlice,
        [concertApi.reducerPath]: concertApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(concertApi.middleware)
}) 


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
