import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBooking';

function useBooking() {
  const {
    isLoading,
    data: booking,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });
  return { isLoading, booking, isError, error };
}

export default useBooking;
