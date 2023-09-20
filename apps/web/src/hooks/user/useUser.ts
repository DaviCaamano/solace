import { useLoginMutation } from '../../context/redux/api/user';

export const useUser = () => {
  return useLoginMutation({
    fixedCacheKey: 'login',
  });
};
