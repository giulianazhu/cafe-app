import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBooking } from '../../services/apiBooking';
import toast from 'react-hot-toast';

function useEditBooking() {
  const queryClient = useQueryClient();
  const {
    isPending: isEditing,
    mutate: handleEdit,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: editBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking details edited');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  return { isEditing, handleEdit, isEditError, editError };
}

export default useEditBooking;
