import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import notesSlice from './reducers/notesSlice'
import ArchivedSlise from './reducers/ArchivedSlise';


const rootReducers = combineReducers({
    notes: notesSlice,
    archived: ArchivedSlise
  });
  
  export const store = configureStore({
    reducer: rootReducers,
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;