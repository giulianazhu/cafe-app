import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBooking';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    isLoading: isDeleting,
    mutate: handleDelete,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      console.log('Successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { isDeleting, handleDelete, isDeleteError, deleteError };
}

export default useDeleteBooking;
