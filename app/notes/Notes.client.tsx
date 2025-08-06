'use client';

import { useState, } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';

interface NotesProps {
  initialData: FetchNotesResponse;
}

const Notes = ({ initialData }: NotesProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    initialData: initialData,    
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.notesPage}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />

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