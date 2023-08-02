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

interface NotesState {
  notes: Draft<Note>[];
}

const initialState: NotesState = {
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
    archiveNote: (state, action: PayloadAction<number>) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((note) => note.id === noteId);
      if (index !== -1) {
        state.notes[index].archived = true;
      }
    },
  },
});

export const { setNotes, addNote, updateNote, archiveNote } = notesSlice.actions;
export default notesSlice.reducer;
