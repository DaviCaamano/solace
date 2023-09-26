import { useUser } from '@hooks/user/useUser';
import { useListNotesQuery } from '@context/redux/api/notes/notes.slice';

export const useListNotes = () => {
  const [, { data: user }] = useUser();
  return useListNotesQuery({ userId: user?.id || '' }, { skip: !user?.id });
};
