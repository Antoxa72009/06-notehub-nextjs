import { fetchNotes } from '@/lib/api/api';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NotesPage from './NotesPage';

export default async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage />
    </HydrationBoundary>
  );
}