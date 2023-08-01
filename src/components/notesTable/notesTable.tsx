import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, Note } from '../../store/reducers/notesSlice';
import { RootState } from '../../store/store';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { PiArchiveDuotone } from 'react-icons/pi';
import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { useState } from 'react';
import AddNoteForm from './AddNoteForm';

import './NoteTable.css';

function NotesTable() {
  const dispatch = useDispatch();
  const notesState = useSelector((state: RootState) => state.notes.notes);

  const formatCreateDate = (createTime: string) => {
    const createDate = new Date(createTime);
    return createDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleAddNote = (newNote: Note) => {
    dispatch(addNote(newNote))
    handleShowForm();
  };

  return (
    <main className="main">
      <h1 className="notes__title">My Notes</h1>
      <div className="table__container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Category</th>
              <th>Content</th>
              <th>Dates</th>
              <th>
                {' '}
                <button className="archivatedAll table__buttons">
                  <FaEdit className="icon__btn" />
                </button>
                <button className="deleteAll table__buttons">
                  <BsFillTrashFill className="icon__btn" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {notesState.map((note) => (
              <tr key={note.id}>
                <td>{note.name}</td>
                <td>{formatCreateDate(note.createTime)}</td>
                <td>{note.category}</td>
                <td>{note.content}</td>
                <td>{note.dates.join(', ')}</td>
                <td>
                  <div className="btn__container">
                    <button className="edit table__buttons">
                      <FaEdit className="icon__btn" />
                    </button>
                    <button className="archivated table__buttons">
                      <PiArchiveDuotone className="icon__btn" />
                    </button>
                    <button className="unarchivated table__buttons">
                      <RiInboxUnarchiveFill className="icon__btn" />
                    </button>
                    <button className="trash table__buttons">
                      <BsFillTrashFill className="icon__btn" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleShowForm} className="addNew__note">
          Add Note
        </button>
        <AddNoteForm showForm={showForm} onClose={handleAddNote} />
      </div>
    </main>
  );
}

export default NotesTable;
