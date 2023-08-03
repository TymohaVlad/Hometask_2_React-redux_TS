import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { archiveNote, deleteNote, Note } from '../../store/reducers/notesSlice';
import { RiInboxUnarchiveFill } from 'react-icons/ri';

import './ArchivedNotes.css'

function ArchivedNote() {
  const dispatch = useDispatch();
  const archivedNotes = useSelector((state: RootState) => state.notes.notes);

  const countActiveNotesByCategory = (category: string) => {
    return archivedNotes.filter((note) => note.category === category && !note.archived).length;
  };

  const countArchivedNotesByCategory = (category: string) => {
    return archivedNotes.filter((note) => note.category === category && note.archived).length;
  };

  const uniqueCategories = [...new Set(archivedNotes.map((note) => note.category))];

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleUnarchiveNote = (noteId: number) => {
    dispatch(archiveNote(noteId));
  };

  const handleDeleteNote = (noteId: number) => {
    dispatch(deleteNote(noteId));
    handleCloseModal();
  };

  const handleShowModal = (note: Note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
    setShowModal(false);
  };

  return (
    <section className="summary__section">
      <div className="summary__table-container">
        <table>
          <thead>
            <tr>
              <th>Note category</th>
              <th>Active</th>
              <th>Archived</th>
              <th>Unarchive</th>
            </tr>
          </thead>
          <tbody>
            {uniqueCategories.map((category) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{countActiveNotesByCategory(category)}</td>
                <td>{countArchivedNotesByCategory(category)}</td>
                <td>
                  {archivedNotes
                    .filter((note) => note.category === category && note.archived)
                    .map((note) => (
                      <button
                        key={note.id}
                        className="unarchivated table__buttons"
                        onClick={() => handleShowModal(note)}
                      >
                        <RiInboxUnarchiveFill className="icon__btn" />
                      </button>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedNote && (
        <div className={`modal__edit ${showModal ? 'active' : ''}`}>
          <div className="modal__content">
            <h2>{selectedNote.name}</h2>
            <p>{selectedNote.content}</p>
            
            <button onClick={() => handleUnarchiveNote(selectedNote.id)}>Unarchive</button>
            <button onClick={() => handleDeleteNote(selectedNote.id)}>Delete</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ArchivedNote;
