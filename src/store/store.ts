import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import notesSlice from './reducers/notesSlice'

const rootReducers = combineReducers({
    notes: notesSlice,
  });
  
  export const store = configureStore({
    reducer: rootReducers,
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;