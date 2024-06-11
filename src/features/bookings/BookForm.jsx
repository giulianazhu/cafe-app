import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCreateBooking } from './useCreateBooking';
import DateBooker from './DateBooker';
import dayjs from 'dayjs';
import Label from '../../ui/Label';
import FormButton from '../../ui/FormButton';
import useEditBooking from './useEditBooking';
import { sendEmail } from '../../services/apiBooking';
import FormRow from '../../ui/FormRow';
import { CgSpinner } from 'react-icons/cg';

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
    // showForm ? handleEdit(data) : handleBooking(data);
    // showForm ? handleShowForm() : reset();
    // data.email && sendEmail(data);

    if (showForm) {
      handleEdit(data, {
        onSuccess: () => {
          handleShowForm();
          data.email && sendEmail(data);
        },
      });
    } else {
      handleBooking(data, {
        onSuccess: () => {
          reset();
          data.email && sendEmail(data);
        },
      });
    }
  }

  const isLoading = isEditing || isBooking;
  // const isError = isEditError || isBookingError;

  const [inputLength, setInputLength] = useState(0);

  function handleChange(e) {
    const value = e.target.value;
    setInputLength(value.length);
  }

  const bookMaxDate = dayjs().add(31, 'day');

  const now = dayjs();
  const maxDays = bookMaxDate.diff(now, 'day');

  // if (isError)
  //   return (
  //     <ModalWindow>
  //       <Error>{isEditError ? editError.message : bookingError.message}</Error>
  //     </ModalWindow>
  //   );

  const inputCommonStyle =
    ' w-full rounded-xl bg-stone-200 p-1 px-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-white ';

  return (
    <main className="m-3 xs:flex xs:items-center xs:justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-96 flex-col gap-3 rounded-md border-2 border-stone-400 p-3 xs:m-3 xs:w-11/12 "
      >
        {/* to send id back to server in order to edit corresponding bookingDetails */}
        <input
          type="text"
          defaultValue={id}
          className="hidden"
          {...register('id')}
        />
        <FormRow>
          <Label htmlFor="name">Name*</Label>
          {/* decided not to isolate an Input component coz of too many configurations e.g. would have to move ...register */}
          <input
            type="text"
            placeholder="John Doe"
            id="name"
            disabled={isLoading}
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
          {errors.name && (
            <p className="text-pink-800">{errors.name.message}</p>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="email">Email</Label>
          <input
            type="email"
            id="email"
            disabled={isLoading}
            className={`${inputCommonStyle}`}
            defaultValue={email}
            {...register('email', {
              maxLength: {
                value: 20,
                message: 'Email address should not exceed 20 characters',
              },
            })}
          />
        </FormRow>
        <FormRow>
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
        </FormRow>
        <FormRow>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            className={`${inputCommonStyle} block w-full`}
            name="notes"
            id="notes"
            rows="3"
            placeholder="E.g. Food allergies etc..."
            disabled={isLoading}
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
          {errors.notes && (
            <p className="text-pink-800">{errors.notes.message}</p>
          )}
        </FormRow>
        <FormRow>
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
            disabled={isLoading}
            rules={{ required: 'Please confirm your booking time' }}
            render={({ field }) => (
              <DateBooker field={field} bookMaxDate={bookMaxDate} />
            )}
          />
          {errors.date && (
            <p className="text-pink-800">{errors.date.message}</p>
          )}
        </FormRow>
        <FormButton disabled={isLoading}>
          {/* {showForm ? 'Edit' : 'Submit'}
           */}
          <div className="flex items-center">
            {!isLoading ? (
              showForm ? (
                'Edit'
              ) : (
                'Book'
              )
            ) : (
              <span className="flex items-center">
                {showForm ? 'Editing' : 'Booking'}
                <CgSpinner className="ml-1 inline animate-spin" />
              </span>
            )}
          </div>
        </FormButton>
      </form>
    </main>
  );
}

export default BookForm;
