import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenu } from '../../services/apiMenu';
import toast from 'react-hot-toast';

function useDeleteMenu() {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleting,
    mutate: handleDelete,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('Menu item deleted');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  return { isDeleting, handleDelete, isDeleteError, deleteError };
}

export default useDeleteMenu;
