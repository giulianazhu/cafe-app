import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import Error from '../../ui/Error';
import { useCreateBooking } from './useCreateBooking';
import DateBooker from './DateBooker';
import dayjs from 'dayjs';
import Label from '../../ui/Label';
import FormButton from '../../ui/FormButton';
import useEditBooking from './useEditBooking';
import { sendEmail } from '../../services/apiBooking';

function BookForm({ showForm, guest = {}, handleShowForm }) {
  const { id, name, phone, email, notes, date } = guest;
  const { isBooking, handleBooking, isBookingError, bookingError } =
    useCreateBooking();
  const { isEditing, handleEdit, isEditError, editError } = useEditBooking();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: ['onChange', 'onBlur'] });

  // -----------------------------------------------//
  function onSubmit(data) {
    console.log(data);
    // showForm ==> means we are editing using bookform and not creating new booking
    showForm ? handleEdit(data) : handleBooking(data);
    showForm ? handleShowForm() : reset();
    data.email && sendEmail(data);
  }

  const [inputLength, setInputLength] = useState(0);

  function handleChange(e) {
    const value = e.target.value;
    setInputLength(value.length);
  }

  const bookMaxDate = dayjs().add(31, 'day');

  const now = dayjs();
  const maxDays = bookMaxDate.diff(now, 'day');

  if (isBookingError)
    return (
      <main className="flex items-center justify-center p-3 pt-1">
        <Error> {bookingError.message} </Error>
      </main>
    );

  const inputCommonStyle =
    ' w-full rounded-xl bg-stone-200 p-1 px-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-white';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-md border-2 border-stone-400 p-3 xs:m-3 xs:w-[27rem]"
    >
      {/* to send id back to server in order to edit corresponding bookingDetails */}
      <input
        type="text"
        defaultValue={id}
        className="hidden"
        {...register('id')}
      />
      <Label htmlFor="name">Name*</Label>
      {/* decided not to isolate an Input component coz of too many configurations e.g. would have to move ...register */}
      <input
        type="text"
        placeholder="John Doe"
        id="name"
        disabled={isBooking}
        className={`${inputCommonStyle}`}
        defaultValue={name}
        {...register('name', {
          required: 'Please enter a name...',
          maxLength: {
            value: 20,
            message: 'Name should not exceed 20 characters',
          },
        })}
      />
      {errors.name && <p className="text-pink-800">{errors.name.message}</p>}
      <Label htmlFor="phone">Phone number</Label>
      <input
        type="text"
        placeholder=""
        id="phone"
        disabled={isBooking}
        className={`${inputCommonStyle}`}
        defaultValue={phone}
        {...register('phone', {
          maxLength: {
            value: 20,
            message: 'Phone number is too long',
          },
        })}
      />
      <Label htmlFor="email">Email</Label>
      <input
        type="email"
        id="email"
        disabled={isBooking}
        className={`${inputCommonStyle}`}
        defaultValue={email}
        {...register('email', {
          maxLength: {
            value: 20,
            message: 'Email address should not exceed 20 characters',
          },
        })}
      />

      <Label htmlFor="notes">Notes</Label>
      <textarea
        className={`${inputCommonStyle} block w-full`}
        name="notes"
        id="notes"
        rows="5"
        placeholder="E.g. Food allergies etc..."
        disabled={isBooking}
        defaultValue={notes}
        {...register('notes', {
          maxLength: {
            value: 300,
            message: 'Content should not exceed 500 characters',
          },
          onChange: (e) => handleChange(e),
        })}
      ></textarea>
      <p className="text-sm font-light text-stone-400">
        {`${inputLength}/300 characters`}
      </p>
      {errors.notes && <p className="text-pink-800">{errors.notes.message}</p>}

      <Label>
        Confirm Booking Time
        <span className="block text-sm font-light text-stone-400">
          {`*Maximum ${maxDays} days in advance`}
        </span>
      </Label>
      {/* STYLING DETAILS OF MUI COMPONENT IN APP.JSX */}

      <Controller
        name="date"
        control={control}
        defaultValue={dayjs(date)}
        disabled={isBooking}
        rules={{ required: 'Please confirm your booking time' }}
        render={({ field }) => (
          <DateBooker field={field} bookMaxDate={bookMaxDate} />
        )}
      />
      {errors.date && <p className="text-pink-800">{errors.date.message}</p>}
      <FormButton>{showForm ? 'Edit' : 'Submit'}</FormButton>
    </form>
  );
}

export default BookForm;
