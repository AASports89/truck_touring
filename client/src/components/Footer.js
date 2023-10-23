import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer id="footer" className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button id="back" className="btn"
            onClick={() => navigate(-1)}
          >
            ⬅️ Go Back 
          </button>
        )}
        <h4 id="foot-title">
          Made with{' '}
            🎲
          {' '}
          <strong> Da Parlay Makers &copy; {year} </strong>
            <div className="col-12 col-sm-12 col-md-8 mx-auto">
            <a
								className="px-3"
								href="https://github.com/AASports89/build-a-bet"
								target="_blank"
								rel="noopener noreferrer">
								<img id="github" src='https://res.cloudinary.com/dhqsixgmo/image/upload/v1666484175/public/images/github-icon_mvuylu.png' alt="github icon"/>
							</a>
            </div>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;