import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMenu } from '../../services/apiMenu';
import toast from 'react-hot-toast';

function useEditMenu() {
  const queryClient = useQueryClient();
  const {
    isPending: isEditing,
    mutate: handleEdit,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: editMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('Menu item edited');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  return { isEditing, handleEdit, isEditError, editError };
}

export default useEditMenu;
