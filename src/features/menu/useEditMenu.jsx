import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMenu } from '../../services/apiMenu';

function useEditMenu() {
  const queryClient = useQueryClient();
  const {
    isLoading: isEditing,
    mutate: handleEdit,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: editMenu,
    onSuccess: () => {
      console.log('Menu item edited');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { isEditing, handleEdit, isEditError, editError };
}

export default useEditMenu;
