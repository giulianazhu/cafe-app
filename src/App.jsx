import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { Suspense, lazy } from 'react';
import Loader from './ui/Loader';
// import Home from './pages/Home';
// import Menu from './pages/Menu';
// import Booking from './pages/Booking';
// import AppLayout from './pages/AppLayout';
// import BookingDetails from './pages/BookingDetails';
// import Login from './pages/Login';

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Booking = lazy(() => import('./pages/Booking'));
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const Login = lazy(() => import('./pages/Login'));
import { lazy } from 'react';
// import Home from './pages/Home';
// import Menu from './pages/Menu';
// import Booking from './pages/Booking';
// import AppLayout from './pages/AppLayout';
// import BookingDetails from './pages/BookingDetails';
// import Login from './pages/Login';

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Booking = lazy(() => import('./pages/Booking'));
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const Login = lazy(() => import('./pages/Login'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
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
            <Suspense fallback={<Loader />}>
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
            </Suspense>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={10}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#831843',
                },
              },
              style: {
                fontSize: '1rem',
                maxWidth: '30rem',
                padding: '1rem 2rem',
                backgroundColor: '#1c1917',
                color: '#e7e5e4',
              },
            }}
          />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
