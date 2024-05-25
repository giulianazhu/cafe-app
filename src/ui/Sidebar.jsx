import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

function Sidebar({ closeNav, isAdmin, handleLogOut }) {
  function handleClick() {
    console.log('Clicked');
    if (isAdmin) {
      handleLogOut();
    }
  }

  return (
    <div
      className="fixed right-0 z-20 flex h-screen w-1/2 flex-col items-end gap-y-10 bg-stone-950 p-2 text-xl text-white opacity-85 sm:p-3 md:text-2xl lg:w-1/3"
      onClick={() => closeNav()}
    >
      <NavLink className="text-2xl md:text-3xl">
        <RxHamburgerMenu />
      </NavLink>
      <StyledNavLink to="/home">Home</StyledNavLink>
      <StyledNavLink to="/menu">Menu</StyledNavLink>
      <StyledNavLink to="/booking">Book with Us</StyledNavLink>
      {isAdmin && (
        <StyledNavLink to="/bookingDetails">Check bookings</StyledNavLink>
      )}
      <StyledNavLink to={isAdmin ? '/home' : 'login'} handleClick={handleClick}>
        {isAdmin ? 'Admin logout' : 'Admin login'}
      </StyledNavLink>
    </div>
  );
}

export default Sidebar;

function StyledNavLink({ to, children, handleClick }) {
  return (
    <NavLink
      to={to}
      className="hover:undeline-offset-4 hover:underline"
      onClick={() => handleClick()}
    >
      {children}
    </NavLink>
  );
}
