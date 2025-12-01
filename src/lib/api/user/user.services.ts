import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from './user.api';

export const useUserInfo = () => {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  return userInfo;
};
