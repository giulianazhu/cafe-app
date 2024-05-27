import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/apiAdmin';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLoggingOut, mutate: handleLogOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(['admin'], { exact: true });
      navigate('/home', { replace: true });
      toast.success('Successfully logged out');
    },
    onError: (err) => {
      console.error('Failed to log out', err.message);
      toast.error(err.message);
    },
  });
  return { isLoggingOut, handleLogOut };
}
