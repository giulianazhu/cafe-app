import { useQuery } from '@tanstack/react-query';
import { getCurrentAdmin } from '../../services/apiAdmin';

export default function useAdmin() {
  const { isLoading: isCheckingAdmin, data: admin } = useQuery({
    //data ==> data?.user = renamed as "admin" in this case
    queryKey: ['admin'],
    queryFn: getCurrentAdmin,
  });

  return {
    isCheckingAdmin,
    admin,
    isAuthenticated: admin?.role === 'authenticated',
  };
}
