// import { getToday } from "../utils/helpers";
import { v4 as uuid } from 'uuid';
import getCurrentDateTime from '../utils/getCurrentDateTime';
import supabase from './supabase';
// import { PAGE_SIZE } from "../utils/constants";

// SELECT IMAGES FOR HOME PAGE
export async function getHomeImg() {
  let { data, error } = await supabase.from('homeImg').select('*');
  if (error) {
    console.error(error);
    throw new Error('Images could not be retrieved...');
  }
  data.sort((a, b) => a.id - b.id);
  return data;
}

// SELECT ABOUTUS INFORMATION FOR HOME PAGE
export async function getHomeInfo() {
  let { data, error } = await supabase.from('aboutus').select('*');
  if (error) {
    console.error(error);
    throw new Error('About us information could not be retrieved...');
  }
  data.sort((a, b) => a.id - b.id);
  return data;
}

// SELECT ALL MENU DATA
export async function getMenu() {
  let { data, error } = await supabase.from('menu').select('*');
  if (error) {
    console.error(error);
    throw new Error('Menu data could not retrieved...');
  }
  data.sort((a, b) => a.id - b.id);
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

//SELECT BOOKING DATES ONLY
export async function getBookingDate() {
  let { data, error } = await supabase.from('booking').select('date');
  if (error) {
    console.error(error);
    throw new Error('Menu data could not retrieved...');
  }
  console.log(data);

  //eventually add count booking num for each calendar day ***may want to limit booking time for within a month'
  // const arrayOfDates = [];
  // for (const obj of data) {
  //   let value = obj.date;
  //   arrayOfDates.push(value);
  // }
  // console.log(arrayOfDates);
  //---------------------------------------------------//

  return data;
}

// export async function getBookings({ filter, sortBy, page }) {
//   let query = supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
//       { count: "exact" }
//     );

//   // FILTER
//   if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

//   // SORT
//   if (sortBy)
//     query = query.order(sortBy.field, {
//       ascending: sortBy.direction === "asc",
//     });

//   if (page) {
//     const from = (page - 1) * PAGE_SIZE;
//     const to = from + PAGE_SIZE - 1;
//     query = query.range(from, to);
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not be loaded");
//   }

//   return { data, count };
// }

// export async function getBooking(id) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, cabins(*), guests(*)")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking not found");
//   }

//   return data;
// }

// // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// // date: ISOString
// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName)")
//     .gte("startDate", date)
//     .lte("startDate", getToday());

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

// export async function updateBooking(id, obj) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
