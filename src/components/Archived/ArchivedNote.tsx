import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { archiveNote, deleteNote, Note } from '../../store/reducers/notesSlice';
import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaWindowClose } from 'react-icons/fa';
import './ArchivedNotes.css';

function ArchivedNote() {
  const dispatch = useDispatch();
  const archivedNotes = useSelector((state: RootState) => state.notes.notes);

  const countActiveNotesByCategory = (category: string) => {
    return archivedNotes.filter(
      (note) => note.category === category && !note.archived
    ).length;
  };

  const countArchivedNotesByCategory = (category: string) => {
    return archivedNotes.filter(
      (note) => note.category === category && note.archived
    ).length;
  };

  const uniqueCategories = [
    ...new Set(archivedNotes.map((note) => note.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleUnarchiveNote = (noteId: number) => {
    dispatch(archiveNote(noteId));
    handleCloseModal();
  };

  const handleDeleteNote = (noteId: number) => {
    dispatch(deleteNote(noteId));
    handleCloseModal();
  };

  const handleShowModal = (category: string) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory('');
    setShowModal(false);
  };

  const archivedNotesForCategory = archivedNotes.filter(
    (note) => note.category === selectedCategory && note.archived
  );

  return (
    <section className="summary__section">
      <div className="summary__table-container">
        <table className="summary__table">
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
                  {countArchivedNotesByCategory(category) > 0 && (
                    <button
                      id="show__note"
                      className="unarchivated table__buttons"
                      onClick={() => handleShowModal(category)}
                    >
                      Show archived notes
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedCategory && (
        <div className={`modal__edit ${showModal ? 'active' : ''}`}>
          <div className="modal__content">
            <h2>Archived Notes for {selectedCategory}</h2>
            <ul>
              {archivedNotesForCategory.map((note) => (
                <li key={note.id}>
                  <h3>{note.name}</h3>
                  <p className='content'>{note.content}</p>
                  <div className="btns__container">
                    <button onClick={() => handleUnarchiveNote(note.id)}>
                      <RiInboxUnarchiveFill className="icons" />
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)}>
                      <BsFillTrashFill className="icons" />
                    </button>
                    <button
                      className="selectedNote__btn"
                      onClick={handleCloseModal}
                    >
                      <FaWindowClose className="icons" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default ArchivedNote;
