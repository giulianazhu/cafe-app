import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import AppLayout from './pages/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

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
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="booking" element={<Booking />} />
                <Route path="admin" element={<Admin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
