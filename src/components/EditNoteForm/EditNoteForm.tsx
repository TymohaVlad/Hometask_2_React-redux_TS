import React, { useState, useEffect } from 'react';
import { Note } from '../../store/reducers/notesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setNotes } from '../../store/reducers/notesSlice';

import './EditForm.css';

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
    <div className={`modal__edit ${showEditForm ? 'active' : ''}`}>
      <div className="modal__content-edit">
        <h2 className="edit__modal-title">Edit Note</h2>
        <form onSubmit={handleSubmit} className="edit__form">
          <select value={editedCategory} onChange={handleCategoryChange}>
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <textarea value={editedContent} onChange={handleContentChange} />
          <div className="edit__buttons-containr">
            <button  type="submit" className="save__btn">
              Save
            </button>
            <button  onClick={handleCloseEditForm} className="close__edit">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteForm;
