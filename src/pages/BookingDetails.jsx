import StyledHeadline from '../ui/StyledHeadline';
import BookingDashboard from '../features/bookings/BookingDashboard';

function BookingDetails() {
  return (
    <div className="w-full">
      <StyledHeadline>Bookings Details</StyledHeadline>
      <BookingDashboard />
    </div>
  );
}

export default BookingDetails;
