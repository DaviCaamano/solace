import { UserRecord } from '#interfaces/user';
import { useLoginMutation } from '@context/redux/user';

type LoginQuery = (user: UserRecord) => Promise<any>;
export const useUser = () => {
  const [login, args] = useLoginMutation({
    fixedCacheKey: 'login',
  });
  return [];
};
