import { useLoginMutation } from '@context/redux/user';

export const useUser = () => {
  return useLoginMutation({
    fixedCacheKey: 'login',
  });
};
