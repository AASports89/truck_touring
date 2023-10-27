import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import Aos from "aos";

import Auth from '../utils/auth';

const Navbar = () => {
  useEffect(() => {
		Aos.init({duration:2000});
		window.addEventListener("scroll", () => {
		});
	}, [])
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
      <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="text-light" to="/">
            <h1 id="title"><img id="build" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1698379989/SITE_NAV_TITLE_qwutim.svg" alt="U-Truck"></img></h1>
          </Link>
          <div className="row" id="links">
          {Auth.loggedIn() ? (
            <>
            <Link className="btn" to="/me">
                {Auth.getProfile().data.username}'s Dashboard
            </Link>
              <Link to="/reservations">
              <button className="btn" to="/reservations">
              Reservations <i class="fa-regular fa-calendar-check"></i>
            </button>
              </Link>
            <button className="btn" onClick={logout}>
                Logout <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            </>
          ) : (
            <>
            <Link className="btn" to="/">
                Trucks  <i id="truck" class="fa-solid fa-truck-fast"></i>
            </Link>
          
            <Link className="btn" to="/login">
                Login <i class="fa-solid fa-circle-user"></i>
            </Link>
            
            <Link className="btn" to="/signup">
                Sign Up <i class="fa-solid fa-user-plus"></i>
            </Link>
            </>
          )}
          </div>
    </nav>
  );
};

export default Navbar;