import { createSlice, PayloadAction, Draft, isAction } from '@reduxjs/toolkit';
import { notesData } from '../../components/data';

export interface Note {
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
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload); 
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
      }
    },
  },
});

export const { setNotes, addNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
