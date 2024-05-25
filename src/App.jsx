import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Admin from './pages/Login';
import AppLayout from './pages/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import BookingDetails from './pages/BookingDetails';
import useAdmin from './features/authentication/useAdmin';
import Loader from './ui/Loader';
import Login from './pages/Login';
import ProtectedRoute from './features/authentication/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
    },
  },
});

const theme = createTheme({
  components: {
    MuiFormControl: {
      //identify relevant subunits from dev tool
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(231, 229, 228) ',
          borderRadius: '0.75rem',
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          'div &': {
            //increased specificity to override default paddinTop: 8px
            paddingTop: 0,
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: 'rgb(80, 7, 36)',
    },
    secondary: {
      main: 'rgb(117, 11, 54)',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="booking" element={<Booking />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="bookingDetails" element={<BookingDetails />} />
                </Route>
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
