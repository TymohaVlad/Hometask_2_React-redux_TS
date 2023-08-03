// archivedSlice.ts

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

interface ArchivedState {
  notes: Draft<Note>[];
}

const initialState: ArchivedState = {
  notes: notesData.map((note) => ({ ...note })),
};

const archivedSlice = createSlice({
  name: 'archived',
  initialState,
  reducers: {
    setArchivedNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload.map((note) => ({ ...note }));
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

export const { setArchivedNotes, archiveNote } = archivedSlice.actions;
export default archivedSlice.reducer;
