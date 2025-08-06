import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client'; 

export default async function NotesPage() {
  const initialData = await fetchNotes({ page: 1, perPage: 12, search: '' });
  
  return <Notes initialData={initialData} />;
}