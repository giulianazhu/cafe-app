import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

function Header({ openNav }) {
  return (
    <header
      id="header"
      className="sticky inset-y-0 top-0 z-20 flex items-center justify-between bg-pink-900 p-2 text-xl text-pink-100 sm:p-3"
    >
      <NavLink to="/home" className="hover:underline hover:underline-offset-4">
        SAKURA
      </NavLink>
      <NavLink
        className="self-center rounded-md text-2xl hover:bg-pink-950/[0.4] md:text-3xl"
        onClick={() => openNav()}
      >
        <RxHamburgerMenu />
      </NavLink>
    </header>
  );
}

export default Header;
