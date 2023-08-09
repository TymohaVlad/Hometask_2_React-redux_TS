import React, { useState } from 'react';

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

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
    <div
      className={`modal ${
        showForm ? 'active' : ''
      } flex items-center justify-center fixed left-0 top-0 w-full h-full bg-black bg-opacity-50`}
    >
      <div className="modal__content w-96 bg-blue-300 m-5 p-8 border rounded-lg relative flex flex-col items-center">
        <h2 className="new__note-title text-2xl font-bold mb-4">
          Add New Note
        </h2>
        <form
          className="addNew__form flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={newNote.name}
            onChange={handleChange}
            placeholder="Name"
            className="h-10 text-lg p-2 border rounded-lg focus:outline-none focus:border-blue-400 mb-2"
          />
          <select
            name="category"
            value={newNote.category}
            onChange={handleChange}
            placeholder="Category"
            className="h-10 text-lg p-2 border rounded-lg focus:outline-none focus:border-blue-400 mb-2"
          >
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleChange}
            placeholder="Content"
            className="min-w-full max-w-full min-h-20 max-h-40 text-lg p-2 border rounded-lg mb-2"
          ></textarea>
          <div className="buttons__contsiner mt-4 flex justify-center gap-2">
            <button
              className="submit__btn bg-green-500 text-white py-1 px-4 rounded-lg text-lg"
              type="submit"
            >
              Add note
            </button>
            <button
              className="close__btn bg-gray-300 py-1 px-4 rounded-lg text-lg"
              onClick={handleCloseForm}
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;
