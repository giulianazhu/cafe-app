import BookForm from '../features/bookings/BookForm';
import StyledHeadline from '../ui/StyledHeadline';

function Booking() {
  return (
    <div>
      <StyledHeadline> Book with Us </StyledHeadline>
      <BookForm />
    </div>
  );
}

export default Booking;
