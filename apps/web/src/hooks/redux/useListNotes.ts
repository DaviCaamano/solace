import { useListNotesQuery } from '@context/redux/notes';
import { useUser } from '@hooks/user/useUser';

export const useListNotes = () => {
  const [, { data: user }] = useUser();
  return useListNotesQuery({ userId: user?.id || '' }, { skip: !user?.id });
};
