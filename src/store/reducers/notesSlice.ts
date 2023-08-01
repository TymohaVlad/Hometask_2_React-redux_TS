import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
import { notesData } from '../../components/data';

interface Note {
  id: number;
  name: string;
  createTime: string;
  content: string;
  category: string;
  dates: string[]; 
  archived: boolean;
}

const initialState: { notes: Draft<Note>[] } = {
  notes: notesData.map((note) => ({ ...note })),
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload.map((note) => ({ ...note }));
    },
  },
});

export const { setNotes } = notesSlice.actions;
export default notesSlice.reducer;
