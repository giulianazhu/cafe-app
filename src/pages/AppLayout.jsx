import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Sidebar from '../ui/Sidebar';

function AppLayout() {
  //NAVBAR TOGGLER FN passed down
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = function () {
    setIsVisible((show) => !show);
  };

  return (
    <div className="grid max-h-max min-h-screen grid-rows-[auto_1fr_auto] bg-stone-800 text-stone-200">
      <Header openNav={handleToggle} />
      <Outlet />
      <Footer />
      {isVisible && <Sidebar closeNav={handleToggle} />}
    </div>
  );
}

export default AppLayout;
