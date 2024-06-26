import { useQuery } from '@tanstack/react-query';
import { getHomeInfo } from '../../services/apiHomeInfo';

function useHomeInfo() {
  const {
    isLoading,
    data: info,
    isError,
    error,
  } = useQuery({
    queryKey: ['homeInfo'],
    queryFn: getHomeInfo,
  });
  return { isLoading, info, isError, error };
}

export default useHomeInfo;
