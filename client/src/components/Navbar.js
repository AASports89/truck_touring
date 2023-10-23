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
      <h1 id="main-title"> 🏈⚽<img id="parlay" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667008558/cooltext422338805357325_qvpd09.png" alt="Parlay Anytime"></img>🏀⚾ </h1>
        <Link className="text-light" to="/">
            <h1 id="title"><img id="build" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1666898132/cooltext422262976759629_qb9ewg.png" alt="Build A Bet"></img>🎲</h1>
          </Link>
          <div className="row" id="links">
          {Auth.loggedIn() ? (
            <>
            <Link className="btn" to="/me">
                {Auth.getProfile().data.username}'s Dashboard 🎛️
            </Link>
              <Link to="/parlays">
              <button className="btn" to="/parlays">
              Parlays 🤑
            </button>
              </Link>
            <button className="btn" onClick={logout}>
                Logout 📴
            </button>
              {/* <div id="user-image" className="card-img-top"><img src={image.user} alt="profile"></img></div> */}
            </>
          ) : (
            <>
            <Link className="btn" to="/">
                Games 🏟️
            </Link>
          
            <Link className="btn" to="/login">
                Login 📡
            </Link>
            
            <Link className="btn" to="/signup">
                Sign Up 🎰
            </Link>
            </>
          )}
          </div>
    </nav>
  );
};

export default Navbar;