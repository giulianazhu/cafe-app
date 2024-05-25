import BookForm from '../features/bookings/BookForm';
import StyledHeadline from '../ui/StyledHeadline';

function Booking() {
  return (
    <>
      <StyledHeadline> Book with Us </StyledHeadline>
      {/* //eventually put label-input set in a row and error message relative to
      the container row??? //xs specified coz need the form to extend 100% +
      contain when smaller than dat */}
      <main className="p-3 pt-1 xs:flex xs:items-center xs:justify-center">
        <BookForm />
      </main>
    </>
  );
}

export default Booking;
