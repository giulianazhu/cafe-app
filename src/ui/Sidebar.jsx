import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

function Sidebar({ closeNav }) {
  return (
    <div
      className="fixed right-0 z-20 flex h-screen w-1/2 flex-col items-end gap-y-10 bg-stone-950 p-3 text-xl text-white opacity-85 sm:p-4 md:p-5 md:text-3xl"
      onClick={() => closeNav()}
    >
      <NavLink className="text-3xl md:text-4xl">
        <RxHamburgerMenu />
      </NavLink>
      <StyledNavLink to="/home">Home</StyledNavLink>
      <StyledNavLink to="/menu">Menu</StyledNavLink>
      <StyledNavLink to="/booking">Book with Us</StyledNavLink>
    </div>
  );
}

export default Sidebar;

function StyledNavLink({ to, children }) {
  return (
    <NavLink to={to} className="hover:undeline-offset-4 hover:underline">
      {children}
    </NavLink>
  );
}
