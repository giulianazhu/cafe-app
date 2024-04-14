import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../../services/apiClients';

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
  console.log(menu);
  return { isLoading, isError, error, menu };
}

export default useMenu;
