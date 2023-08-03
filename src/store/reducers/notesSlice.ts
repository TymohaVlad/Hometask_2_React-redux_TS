import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
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
    archiveNote: (state, action: PayloadAction<number>) => {
      const noteId = action.payload;
      const note = state.notes.find((note) => note.id === noteId);
      if (note) {
        note.archived = !note.archived; 
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },
    deleteAllNotes: (state) => {
      state.notes = [];
    },
  },
});

export const { setNotes, addNote, archiveNote, deleteNote, deleteAllNotes } = notesSlice.actions;
export default notesSlice.reducer;
