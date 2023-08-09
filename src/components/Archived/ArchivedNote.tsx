import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { archiveNote, deleteNote } from '../../store/reducers/notesSlice';
import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaWindowClose } from 'react-icons/fa';

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
        <table className="summary__table bg-lightgreen text-lg w-4/6 bg-lime-200 mx-auto text-center">
          <thead>
            <tr>
              <th className="px-5 py-3">Note category</th>
              <th className="px-5 py-3">Active</th>
              <th className="px-5 py-3">Archived</th>
              <th className="px-5 py-3">Unarchive</th>
            </tr>
          </thead>
          <tbody>
            {uniqueCategories.map((category) => (
              <tr
                key={category}
                className="hover:bg-purple-300 transition duration-300"
              >
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {category}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {countActiveNotesByCategory(category)}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {countArchivedNotesByCategory(category)}
                </td>
                <td className="px-5 py-3 border border-solid border-gray-300">
                  {countArchivedNotesByCategory(category) > 0 && (
                    <button
                      onClick={() => handleShowModal(category)}
                      className="bg-blue-500 py-2 px-4 rounded-lg text-white"
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
        <div
          className={`modal__edit ${
            showModal ? 'active' : ''
          } fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div className="modal__content bg-blue-300 w-2/3 h-4/5 border border-solid border-gray-800 p-6 rounded-lg flex flex-col items-center gap-3">
            <h2 className="text-xl font-semibold">
              Archived Notes for {selectedCategory}
            </h2>
            <ul className="">
              {archivedNotesForCategory.map((note) => (
                <li key={note.id} className="w-full">
                  <h3 className="text-lg font-semibold">{note.name}</h3>
                  <p className="content text-base">{note.content}</p>
                  <div className="btns__container mt-2">
                    <button
                      onClick={() => handleUnarchiveNote(note.id)}
                      className="selectedNote__btn"
                    >
                      <RiInboxUnarchiveFill className="icons" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="selectedNote__btn"
                    >
                      <BsFillTrashFill className="icons" />
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="selectedNote__btn"
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
