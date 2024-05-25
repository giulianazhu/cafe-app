import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenu } from '../../services/apiMenu';

function useAddMenu() {
  const queryClient = useQueryClient();
  const {
    isLoading: isAdding,
    mutate: handleAdd,
    isError: isAddError,
    error: addError,
  } = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      console.log('New menu added');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { isAdding, handleAdd, isAddError, addError };
}

export default useAddMenu;
