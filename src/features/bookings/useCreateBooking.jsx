import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../../services/apiBooking';
import toast from 'react-hot-toast';

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const {
    isPending: isBooking,
    mutate: handleBooking,
    isError: isBookingError,
    error: bookingError,
  } = useMutation({
    mutationFn: createBooking,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success(
        `Successfully booked. ${user[0].email && 'Please check for confirmation email.'}`,
      );
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  return { isBooking, handleBooking, isBookingError, bookingError };
}
