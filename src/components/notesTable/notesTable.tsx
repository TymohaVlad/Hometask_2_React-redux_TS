import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, Note, archiveNote, deleteNote, deleteAllNotes } from '../../store/reducers/notesSlice';
import { RootState } from '../../store/store';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { PiArchiveDuotone } from 'react-icons/pi';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
import EditNoteForm from '../EditNoteForm/EditNoteForm';
import ArchivedNote from '../Archived/ArchivedNote';

function NotesTable() {
  const dispatch = useDispatch();
  const notesState = useSelector((state: RootState) =>
    state.notes.notes.filter((note) => !note.archived)
  );

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const formatCreateDate = (createTime: string) => {
    const createDate = new Date(createTime);
    return createDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleAddNote = (newNote: Note | null) => {
    if (newNote !== null) {
      dispatch(addNote(newNote));
    }
    handleShowForm();
  };

  const handleShowEditForm = (note: Note) => {
    setSelectedNote(note);
    setShowEditForm(true);
  };

  const handleEditNote = (editNote: Note | null) => {
    if (editNote !== null) {
      dispatch(addNote(editNote));
    }
    handleCloseEditForm();
  };

  const handleCloseEditForm = () => {
    setSelectedNote(null);
    setShowEditForm(false);
  };

  const handleArchiveNote = (noteId: number) => {
    dispatch(archiveNote(noteId)); 
  };

  const handleArchiveAll = () => {
    notesState.forEach((note) => {
      dispatch(archiveNote(note.id))
    });
  };

  const handleDeleteNote = (noteId: number) => {
    dispatch(deleteNote(noteId));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllNotes());
  };
  function findDatesInContent(text:string) {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    const matches = text.match(dateRegex);
  
    if (matches) {
      return [...new Set(matches)];
    }
    return [];
  }
  const getDatesFromContent = (text: string) => {
    const dates = findDatesInContent(text);
    return dates.join(', ');
  };

  return (
    <main className="main">
      <h1 className="text-3xl font-bold underline text-center mb-5">My Notes</h1>
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
                  <PiArchiveDuotone onClick={handleArchiveAll} className="icon__btn" />
                </button>
                <button className="deleteAll table__buttons" onClick={handleDeleteAll}>
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
                <td>{getDatesFromContent(note.content)}</td>
                <td>
                  <div className="btn__container">
                    <button
                      onClick={() => handleShowEditForm(note)}
                      className="edit table__buttons"
                    >
                      <FaEdit className="icon__btn" />
                    </button>
                    <button onClick={() => handleArchiveNote(note.id)} className="archivated table__buttons">
                      <PiArchiveDuotone className="icon__btn" />
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)} className="trash table__buttons">
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
        <EditNoteForm
          showEditForm={showEditForm}
          onClose={handleEditNote}
          selectedNote={selectedNote}
        />
        <ArchivedNote />
      </div>
    </main>
  );
}

export default NotesTable;
