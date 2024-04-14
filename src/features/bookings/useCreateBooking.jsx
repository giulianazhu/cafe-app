import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../../services/apiClients';

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const {
    isLoading: isBooking,
    mutate,
    isError,
    error,
  } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      console.log('Booking confirmed');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { isBooking, mutate, isError, error };
}
