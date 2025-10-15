import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import productsReducer from './productsSlice'
import setCurrentProductDetailsSlice from './currentProductDetails'
import settingsReducer from './settingsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    currentProductDetails: setCurrentProductDetailsSlice,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
