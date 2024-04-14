import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import Error from '../ui/Error';
import { useCreateBooking } from '../features/bookings/useCreateBooking';
import DateBooker from '../features/bookings/DateBooker';
import dayjs from 'dayjs';

function Booking() {
  const { isBooking, mutate, isError, error } = useCreateBooking();

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
    console.log(data.date.format('YYYY-MM-DD HH:mm:ss'));
    mutate(data);
    reset();
  }

  const [inputLength, setInputLength] = useState(0);

  function handleChange(e) {
    const value = e.target.value;
    setInputLength(value.length);
  }

  const bookMaxDate = dayjs().add(31, 'day');

  const now = dayjs();
  const maxDays = bookMaxDate.diff(now, 'day');

  if (isError)
    return (
      <main className="flex items-center justify-center p-3 pt-1">
        <Error> {error.message} </Error>
      </main>
    );

  const inputCommonStyle =
    ' w-full rounded-xl bg-stone-200 p-1 px-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-white';

  return (
    //eventually put label-input set in a row and error message relative to the container row???
    <main className="xs:flex xs:justify-center xs:items-center p-3 pt-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="xs:w-[27rem] xs:m-3 flex flex-col p-3"
      >
        <Label htmlFor="name">Name*</Label>
        {/* decided not to isolate an Input component coz of too many configurations e.g. would have to move ...register */}
        <input
          type="text"
          placeholder="John Doe"
          id="name"
          disabled={isBooking}
          className={`${inputCommonStyle}`}
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
        {errors.notes && (
          <p className="text-pink-800">{errors.notes.message}</p>
        )}

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
          defaultValue={null}
          disabled={isBooking}
          rules={{ required: 'Please confirm your booking time' }}
          render={({ field }) => (
            <DateBooker field={field} bookMaxDate={bookMaxDate} />
          )}
        />
        {errors.date && <p className="text-pink-800">{errors.date.message}</p>}

        <button className="my-3 self-start rounded-lg bg-pink-900 p-2 text-pink-100 hover:border-2 hover:border-pink-100 focus:shadow-pink-200 active:bg-pink-950">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Booking;

function Label({ children, htmlFor }) {
  return (
    <label className="w-full py-1 pt-3 text-lg" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
