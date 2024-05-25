import Dashboard from '../../ui/Dashboard';
import useBooking from './useBooking';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';

function BookingDashboard() {
  const { isLoading, booking, isError, error } = useBooking();
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="flex justify-center">
        <Error> {error.message} </Error>
      </div>
    );
  return <Dashboard data={booking} />;
}

export default BookingDashboard;
