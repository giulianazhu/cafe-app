import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBooking';
import toast from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: handleDelete,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Successfully deleted');
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { isDeleting, handleDelete, isDeleteError, deleteError };
}

export default useDeleteBooking;
