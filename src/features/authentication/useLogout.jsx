import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/apiAdmin';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoggingOut, mutate: handleLogOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(['admin'], { exact: true });
      navigate('/home', { replace: true });
    },
    onError: (err) => {
      console.error('Logout failed', err.message);
    },
  });
  return { isLoggingOut, handleLogOut };
}
