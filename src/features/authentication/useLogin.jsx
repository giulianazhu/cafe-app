import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logAdmin } from '../../services/apiAdmin';

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleLogIn, isLoading: isLogging } = useMutation({
    mutationFn: logAdmin,
    onSuccess: (admin) => {
      queryClient.setQueryData(['admin'], admin);
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      //invalidate to make sure that when sidebar loads it uses the newest admin data
      //--> admin login will change into admin log out upon loggin in
      navigate('/home', { replace: true });
    },
    onError: (err) => console.error('Login failed', err.message),
  });
  return { handleLogIn, isLogging };
}
