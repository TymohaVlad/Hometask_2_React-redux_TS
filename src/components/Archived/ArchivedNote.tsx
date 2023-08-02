import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function ArchivedNote() {
  const archivedNotes = useSelector((state: RootState) => state.archived.notes);

  const countActiveNotesByCategory = (category: string) => {
    return archivedNotes.filter((note) => note.category === category && !note.archived).length;
  };

  const countArchivedNotesByCategory = (category: string) => {
    return archivedNotes.filter((note) => note.category === category && note.archived).length;
  };

  const uniqueCategories = [...new Set<string>(archivedNotes.map((note) => note.category))];

  const notesCountByCategory: Record<string, { active: number; archived: number }> = uniqueCategories.reduce(
    (counts, category) => {
      const activeCount = countActiveNotesByCategory(category);
      const archivedCount = countArchivedNotesByCategory(category);
      counts[category] = { active: activeCount, archived: archivedCount };
      return counts;
    },
    {} as Record<string, { active: number; archived: number }>
  );

  return (
    <section className="summary__section">
      <div className="summary__table-container">
        <table>
          <thead>
            <tr>
              <th>Note category</th>
              <th>Active</th>
              <th>Archived</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(notesCountByCategory).map(([category, counts]) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{counts.active}</td>
                <td>{counts.archived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ArchivedNote;
