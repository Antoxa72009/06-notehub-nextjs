import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsPage from './NoteDetailsPage';
import { fetchNoteById } from '@/lib/api/api';
import { notFound } from 'next/navigation';

interface NotesPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NotesPageProps) {
  const { id } = await params;
  if (!id) {
    notFound(); 
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsPage id={id} />
    </HydrationBoundary>
  );
}