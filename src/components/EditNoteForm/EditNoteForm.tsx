import React, { useState, useEffect } from 'react';
import { Note } from '../../store/reducers/notesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setNotes } from '../../store/reducers/notesSlice';

interface EditNoteFormProps {
  showEditForm: boolean;
  onClose: (newNote: Note | null) => void;
  selectedNote: Note | null;
}

function EditNoteForm({
  showEditForm,
  onClose,
  selectedNote,
}: EditNoteFormProps) {
  const notesDataState = useSelector((state: RootState) => state.notes.notes);

  const dispatch = useDispatch();
  const [editedContent, setEditedContent] = useState<string>('');
  const [editedCategory, setEditedCategory] = useState<string>('');

  useEffect(() => {
    if (selectedNote) {
      setEditedContent(selectedNote.content || '');
      setEditedCategory(selectedNote.category || '');
    }
  }, [selectedNote]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedNote) {
      const updatedNote: Note = {
        ...selectedNote,
        content: editedContent,
        category: editedCategory,
      };

      const index = notesDataState.findIndex(
        (note) => note.id === selectedNote.id
      );

      if (index !== -1) {
        const updatedNotesData = [...notesDataState];
        updatedNotesData[index] = updatedNote;
        dispatch(setNotes(updatedNotesData));
      }
    }
    onClose(null);
  };

  const handleCloseEditForm = () => {
    onClose(null);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedCategory(e.target.value);
  };

  if (!showEditForm) {
    return null;
  }

  return (
    <div
      className={`modal__edit ${
        showEditForm ? 'active' : ''
      } fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="modal__content-edit bg-blue-300 w-2/3 h-4/5 border border-solid border-gray-800 p-6 rounded-lg flex flex-col items-center gap-4">
        <h2 className="edit__modal-title text-xl font-semibold">Edit Note</h2>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-3/5 flex flex-col gap-3 "
        >
          <select
            value={editedCategory}
            onChange={handleCategoryChange}
            className="h-10 text-lg"
          >
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <textarea
            value={editedContent}
            onChange={handleContentChange}
            className=" min-h-150 max-h-300 text-lg border rounded-lg resize-y"
          />
          <div className="flex justify-center items-center gap-3">
            <button
              type="submit"
              className="bg-blue-500 py-2 px-4 rounded-lg text-white"
            >
              Save
            </button>
            <button
              onClick={handleCloseEditForm}
              className="bg-gray-300 py-2 px-4 rounded-lg text-gray-800"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteForm;
