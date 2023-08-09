import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNote,
  Note,
  archiveNote,
  deleteNote,
  deleteAllNotes,
} from '../../store/reducers/notesSlice';
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
      dispatch(archiveNote(note.id));
    });
  };

  const handleDeleteNote = (noteId: number) => {
    dispatch(deleteNote(noteId));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllNotes());
  };
  function findDatesInContent(text: string) {
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
    <main className="main p-6">
      <h1 className="text-4xl font-bold underline text-center mb-5">
        My Notes
      </h1>
      <div className="table__container">
        <table className="text-2xl display-table m-auto table bg-gray-100 shadow">
          <thead>
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Content</th>
              <th className="px-5 py-3">Dates</th>
              <th className="px-5 py-3">
                <button
                  className="archivatedAll table__buttons"
                  onClick={handleArchiveAll}
                >
                  <PiArchiveDuotone className="icon__btn text-2xl m-3" />
                </button>
                <button
                  className="deleteAll table__buttons"
                  onClick={handleDeleteAll}
                >
                  <BsFillTrashFill className="icon__btn text-2xl m-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {notesState.map((note) => (
              <tr
                key={note.id}
                className="hover:bg-purple-300 transition duration-300"
              >
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {note.name}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {formatCreateDate(note.createTime)}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {note.category}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {note.content}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {getDatesFromContent(note.content)}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  <div className="btn__container">
                    <button
                      onClick={() => handleShowEditForm(note)}
                      className="edit table__buttons"
                    >
                      <FaEdit className="icon__btn text-2xl m-1" />
                    </button>
                    <button
                      onClick={() => handleArchiveNote(note.id)}
                      className="archivated table__buttons"
                    >
                      <PiArchiveDuotone className="icon__btn text-2xl m-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="trash table__buttons"
                    >
                      <BsFillTrashFill className="icon__btn text-2xl m-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add__btn-container flex justify-end max-w-4xl m-auto">
          <button
            onClick={handleShowForm}
            className="bg-blue-300 py-1 px-4 rounded-lg text-lg  my-5 "
          >
            Add Note
          </button>
        </div>
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
