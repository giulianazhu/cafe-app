import { NavLink } from 'react-router-dom';

function Error({ children }) {
  return (
    <div className="m-3 flex w-full flex-col items-center justify-center p-3 text-center">
      <span className="m-2 text-lg">{children}</span>
      <span className="text-md m-2">
        <NavLink to="/home" className={'underline'}>
          Back to Home
        </NavLink>
      </span>
      <img src="dogeza.png" className="w-2/3 lg:w-1/2" alt="" />
    </div>
  );
}

export default Error;
