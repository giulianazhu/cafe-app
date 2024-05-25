import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBooking } from '../../services/apiBooking';

function useEditBooking() {
  const queryClient = useQueryClient();
  const {
    isLoading: isEditing,
    mutate: handleEdit,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: editBooking,
    onSuccess: () => {
      console.log('Booking details edited');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { isEditing, handleEdit, isEditError, editError };
}

export default useEditBooking;
