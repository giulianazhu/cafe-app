import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

function Header({ openNav }) {
  return (
    <main className="sticky inset-y-0 top-0 z-10 flex justify-between bg-pink-900 p-3 text-2xl text-pink-100 sm:p-4 md:p-5 md:text-3xl">
      <NavLink to="/home" className="hover:underline hover:underline-offset-4">
        SAKURA
      </NavLink>
      <NavLink
        className="self-center rounded-md text-3xl hover:bg-pink-950/[0.4] md:text-4xl"
        onClick={() => openNav()}
      >
        <RxHamburgerMenu />
      </NavLink>
    </main>
  );
}

export default Header;
