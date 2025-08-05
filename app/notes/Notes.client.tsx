'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from '@/hooks/useDebounce';
import css from './NotesPage.module.css';
import { type Note } from '@/types/note';

interface NotesProps {
  initialNotes: Note[];
  initialPage: number;
  initialTotalPages: number;
  initialTotalNotes: number;
}

const Notes = ({
  initialNotes,
  initialPage,
  initialTotalPages,
  initialTotalNotes,
}: NotesProps) => {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const handlePageChange = useCallback((selectedPage: number) => {
    setPage(selectedPage);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const { data } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    initialData: {
      notes: initialNotes,
      page: initialPage,
      perPage: 12,
      totalPages: initialTotalPages,
      totalNotes: initialTotalNotes,
    },
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.notesPage}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      {notes.length === 0 ? (
        <div className={css['no-notes-message']}>
          <p>Нотаток немає. Створіть свою першу нотатку!</p>
        </div>
      ) : (
        <NoteList notes={notes} />
      )}

      {isModalOpen && (
        <NoteModal onClose={handleCloseModal}>
          <NoteForm onCancel={handleCloseModal} />
        </NoteModal>
      )}
    </div>
  );
};

export default Notes;