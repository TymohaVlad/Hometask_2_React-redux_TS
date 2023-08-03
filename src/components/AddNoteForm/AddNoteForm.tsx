import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import './NoteForm.css'


interface AddNoteFormProps {
  showForm: boolean;
  onClose: (newNote: Note | null) => void;
}

interface Note {
  id: number;
  name: string;
  createTime: string;
  content: string;
  category: string;
  dates: string[];
  archived: boolean;
}

function AddNoteForm({ showForm, onClose }: AddNoteFormProps) {
  const [newNote, setNewNote] = useState<Note>({
    id: Date.now(),
    name: '',
    createTime: new Date().toISOString(),
    content: '',
    category: '',
    dates: [],
    archived: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose(newNote);
  };
  const handleCloseForm = () => {
    onClose(null);
  };

  if (!showForm) return null;

  return (
    <div className={`modal ${showForm ? 'active' : ''}`}>
      <div className="modal__content">
        <h2 className='new__note-title'>Add New Note</h2>
        <form className='addNew__form' onSubmit={handleSubmit}>
          <input type="text" name="name" value={newNote.name} onChange={handleChange} placeholder="Name" />
          <select name="category" value={newNote.category} onChange={handleChange} placeholder="Category">
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <textarea name="content" value={newNote.content} onChange={handleChange} placeholder="Content"></textarea>
          <div className='buttons__contsiner'>
          <button className='submit__btn' type="submit" value="Add Note">Add note</button>
          <button className='close__btn' onClick={handleCloseForm} type="button" value="Add Note">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;
