import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Sidebar from '../ui/Sidebar';
import useAdmin from '../features/authentication/useAdmin';
import Loader from '../ui/Loader';
import useLogout from '../features/authentication/useLogout';

function AppLayout() {
  //NAVBAR TOGGLER FN passed down
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = function () {
    setIsVisible((show) => !show);
  };

  const { isCheckingAdmin, isAuthenticated } = useAdmin();
  const { isLoggingOut, handleLogOut } = useLogout();

  if (isCheckingAdmin || isLoggingOut) return <Loader />;

  return (
    <div className="relative grid max-h-max min-h-screen grid-rows-[auto_1fr_auto] bg-stone-800 text-stone-200">
      <Header openNav={handleToggle} />
      <Outlet />
      <Footer />
      {isVisible && (
        <Sidebar
          closeNav={handleToggle}
          isAdmin={isAuthenticated}
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
}

export default AppLayout;
