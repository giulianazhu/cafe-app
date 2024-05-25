import { useQuery } from '@tanstack/react-query';
import { getHomeImg } from '../../services/apiHomeInfo';

function useHomeImages() {
  const {
    isLoading,
    data: homeImages,
    isError,
    error,
  } = useQuery({
    queryKey: ['homeImg'],
    queryFn: getHomeImg,
  });

  return { isLoading, homeImages, isError, error };
}

export default useHomeImages;
