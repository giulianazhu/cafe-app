import Dashboard from '../../ui/Dashboard';
import useBooking from './useBooking';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';
import ModalWindow from '../../ui/ModalWindow';

function BookingDashboard() {
  const { isLoading, booking, isError, error } = useBooking();
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ModalWindow>
        <Error> {error.message} </Error>
      </ModalWindow>
    );
  return <Dashboard data={booking} />;
}

export default BookingDashboard;
