import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client'; 

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const initialNotesData = await queryClient.fetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes
        initialNotes={initialNotesData.notes}
        initialPage={initialNotesData.page}
        initialTotalPages={initialNotesData.totalPages}
        initialTotalNotes={initialNotesData.totalNotes}
      />
    </HydrationBoundary>
  );
}