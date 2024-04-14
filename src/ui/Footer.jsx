import { FaInstagram } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FiTwitter } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-pink-900 p-3">
      <h1 className="mb-1 text-xl"> SAKURA </h1>
      <ul className="py-1 italic tracking-wide">
        <li>Address: address_name</li>
        <li>Phone: phone_number</li>
        <li>Email: sakura@email.com</li>
      </ul>
      <span className="mt-1 flex gap-3 italic tracking-wide">
        Follow us on
        <div className="inline-flex gap-2 self-center">
          <StyledNavLink>
            <FaInstagram />
          </StyledNavLink>
          <StyledNavLink>
            <FiTwitter />
          </StyledNavLink>
          <StyledNavLink>
            <FaSquareFacebook />
          </StyledNavLink>
        </div>
      </span>
    </div>
  );
}

export default Footer;

function StyledNavLink({ children }) {
  return (
    <NavLink className="rounded-md hover:shadow-md hover:shadow-white">
      {children}
    </NavLink>
  );
}
