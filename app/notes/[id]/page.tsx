import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsPage from './NoteDetailsPage';
import { fetchNoteById } from '@/lib/api/api';

export default async function Notes({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const noteId = params.id;

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