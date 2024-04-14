import { useQuery } from '@tanstack/react-query';
import { getBookingDate } from '../services/apiXXX';

function BookingDetails() {
  const {
    isLoading,
    data: booking,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    //will give bookingsData as a new querykey dependent on data: bookingsdata when i make the api for bookingdata
    queryFn: getBookingDate,
  });
  return (
    <div>
      <p></p>
    </div>
  );
}

export default BookingDetails;
