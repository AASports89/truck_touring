import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import { QUERY_RESERVATIONS, QUERY_ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
// import ParlayForm from './ParlayForm';

const ReservationList = ({
  reservations,
  title,
  Wins,
  Losses,
  showUsername = true,
}) => {
  const { username } = useParams();
const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, QUERY_RESERVATIONS, {
      variables: { username: username },
    });
  
    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
      return <Navigate to="/reservations"/>;
    }
  
    if (loading) {
      return <div>Loading...💸...</div>;
    }
  
    if (!user?.username) {
      return (
        <h4 id="title-list">
            Login in to play❗ <i id="error_icon" class="fa-solid fa-circle-exclamation"></i> Click on the links above to
          Sign Up <i class="fa-solid fa-user-plus"></i> or Log In <i class="fa-solid fa-circle-user"></i> <i id="error_icon" class="fa-solid fa-circle-exclamation"></i>
        </h4>
      );
    }

  return (
  
    <div className='row' id="parlay-row">
       <h5 id="user-title">
        {`${user.username}'s Picks`}
        <p id="totals">TOTALS</p>
        <p id="wins">Winnings: {Wins="+$3,200.00"}</p>
        <p id="losses">Losses: {Losses="-$1,650.00"}</p>
          <p>{title="Winner...Winner 💰...Chicken...Dinner 🐔"}</p> 
      </h5>
      <main className="flex-row justify-center" id="action">
      {reservations &&
        reservations.map((reservation) => (
          <div key={reservation._id} className="card mb-3" id="user-parlays">
            <h4 className="card-header" id="single-header">
              {showUsername ? (
               <p>
                <Link
                  className="text-light" to={`/profiles/${reservation.username}`}>
                 <span style={{ fontSize: '2rem' }}>
                 {reservation.name}
                 <p style={{fontSize: '1.5rem'}}> Date Reserved: [{reservation.date}]</p>
                 <p  style={{ fontSize: '1.5rem' }}>Ticket Code: [{reservation.win_choice}]</p>
                <br/> 
                 </span>
                  <span style={{ fontSize: '1rem' }}>
                    Created On: {reservation.createdAt}
                  </span>
                </Link>
               </p> 
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    Previous reserved date: {reservation.createdAt}
                  </span>
               
                </>
              )}
            </h4>
          </div>
        ))}
    </main>
    </div>
  );
};

export default ReservationList;