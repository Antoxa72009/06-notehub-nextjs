import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsPage from './NoteDetailsPage';
import { fetchNoteById } from '@/lib/api/api';
import { notFound } from 'next/navigation';

interface NotesPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetails({ params }: NotesPageProps) {
  if (!params.id) {
    notFound();
  }

  const noteId = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsPage id={noteId} />
    </HydrationBoundary>
  );
}