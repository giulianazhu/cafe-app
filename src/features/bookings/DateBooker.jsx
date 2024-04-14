import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function DateBooker({ field, bookMaxDate }) {
  // Imported dayjs from 'dayjs' to use its day(), hour() METHODs
  function isSunday(date) {
    const day = date.day();
    return day === 0;
  }

  // can only book between 9am to 4pm (supposing 5pm closing) //
  function isClosed(value, view) {
    return view === 'hours' && (value.hour() < 9 || value.hour() > 15);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          {...field}
          disablePast
          shouldDisableDate={isSunday}
          shouldDisableTime={isClosed}
          views={['year', 'month', 'day', 'hours', 'minutes']}
          ampm={false}
          maxDate={bookMaxDate}
          id="date"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateBooker;
