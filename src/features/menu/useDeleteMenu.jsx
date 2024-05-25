import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenu } from '../../services/apiMenu';

function useDeleteMenu() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate: handleDelete,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      console.log('Menu item deleted');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { isDeleting, handleDelete, isDeleteError, deleteError };
}

export default useDeleteMenu;
