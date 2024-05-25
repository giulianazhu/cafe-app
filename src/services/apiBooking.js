import getCurrentDateTime from '../utils/getCurrentDateTime';
import supabase from './supabase';
import { v4 as uuid } from 'uuid';
import emailjs from '@emailjs/browser';

//SELECT BOOKING DATES ONLY
export async function getBookings() {
  let { data, error } = await supabase.from('booking').select('*');
  if (error) {
    console.error(error);
    throw new Error('Bookings data could not retrieved...');
  }
  data.forEach((booking) => (booking.date = new Date(booking.date)));
  data.sort((a, b) => a.date.getTime() - b.date.getTime());
  return data;
}

// INSERT BOOKING DATA
export async function createBooking(bookingDetails) {
  const formatId = uuid();
  const formatDate = bookingDetails.date.format('YYYY-MM-DD HH:mm:ss');
  const createdAt = getCurrentDateTime();
  let { data, error } = await supabase
    .from('booking')
    .insert([
      {
        ...bookingDetails,
        id: formatId,
        date: formatDate,
        created_at: createdAt,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error('Booking could not be created...');
  }
}

// EDIT BOOKING DATA
export async function editBooking(bookingDetails) {
  const formatDate = bookingDetails.date.format('YYYY-MM-DD HH:mm:ss');
  let { data, error } = await supabase
    .from('booking')
    .update({ ...bookingDetails, date: formatDate })
    .eq('id', bookingDetails.id);
  if (error) {
    console.error(error);
    throw new Error('Booking could not be edited');
  }
}

// DELETE BOOKING DATA
export async function deleteBooking(id) {
  let { error } = await supabase.from('booking').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Menu item could not be deleted');
  }
}

// SEND BOOKING CONFIRMATION EMAIL
export async function sendEmail(bookingDetails) {
  const formatDate = bookingDetails.date.format('YYYY-MM-DD HH:mm:ss');
  try {
    await emailjs.send(
      'service_bd8f5zm',
      'template_m3douy7',
      {
        name: bookingDetails.name,
        email: bookingDetails.email,
        message: `Your booking time is ${formatDate}`,
      },
      {
        publicKey: 'BXS30xGxy_FQKRt2s',
      },
    );
    console.log('Confirmation email successfully sent!');
  } catch (error) {
    console.log('Failed to send confirmation email...', error.text);
  }
}
