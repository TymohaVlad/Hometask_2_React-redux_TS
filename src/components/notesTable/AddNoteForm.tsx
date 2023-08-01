import React, { useState } from 'react';

interface AddNoteFormProps {
  showForm: boolean;
  onClose: (newNote: any) => void;
}

function AddNoteForm({ showForm, onClose }: AddNoteFormProps) {
  const [newNote, setNewNote] = useState({
    name: '',
    createTime: '',
    content: '',
    category: '',
    dates: [],
    archived: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('New Note:', newNote);
    onClose(newNote); 
  };

  if (!showForm) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={newNote.name} onChange={handleChange} placeholder="Name" />
          <input type="text" name="createTime" value={newNote.createTime} onChange={handleChange} placeholder="Created" />
          <input type="text" name="category" value={newNote.category} onChange={handleChange} placeholder="Category" />
          <input type="text" name="content" value={newNote.content} onChange={handleChange} placeholder="Content" />
          <input type="submit" value="Add Note" />
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;
