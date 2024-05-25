import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../../services/apiMenu';

function useMenu() {
  const {
    isLoading,
    data: menu,
    isError,
    error,
  } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });
  return { isLoading, isError, error, menu };
}

export default useMenu;
