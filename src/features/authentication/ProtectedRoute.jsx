import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from './useAdmin';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';

export default function ProtectedRoute() {
  const { isCheckingAdmin, isAuthenticated: isAdmin } = useAdmin();
  if (isCheckingAdmin) return <Loader />;
  if (!isAdmin)
    return (
      <div className="flex w-full items-center justify-center">
        <div className="w-2/3 lg:w-1/2">
          <Error>
            {'Admin access only. Please click '}
            <NavLink to="/login" className="underline decoration-solid">
              HERE
            </NavLink>
            {' to log in.'}
          </Error>
        </div>
      </div>
    );
  return <Outlet />;
}
