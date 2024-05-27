import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenu } from '../../services/apiMenu';
import toast from 'react-hot-toast';

function useAddMenu() {
  const queryClient = useQueryClient();
  const {
    isPending: isAdding,
    mutate: handleAdd,
    isError: isAddError,
    error: addError,
  } = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('New menu item added');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  return { isAdding, handleAdd, isAddError, addError };
}

export default useAddMenu;
