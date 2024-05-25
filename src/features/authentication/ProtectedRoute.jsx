import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from './useAdmin';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';

export default function ProtectedRoute() {
  const { isCheckingAdmin, isAuthenticated: isAdmin } = useAdmin();
  if (isCheckingAdmin) return <Loader />;
  if (!isAdmin)
    return (
      <Error>
        Admin access only. Please click{' '}
        <NavLink to="/login" className="underline decoration-solid">
          HERE
        </NavLink>{' '}
        to log in.
      </Error>
    );
  return <Outlet />;
}
