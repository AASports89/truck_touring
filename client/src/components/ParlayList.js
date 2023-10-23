import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import { QUERY_PARLAYS, QUERY_ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
// import ParlayForm from './ParlayForm';

const ParlayList = ({
  parlays,
  title,
  Wins,
  Losses,
  showUsername = true,
}) => {
  const { username } = useParams();
const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, QUERY_PARLAYS, {
      variables: { username: username },
    });
  
    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
      return <Navigate to="/parlays"/>;
    }
  
    if (loading) {
      return <div>Loading...💸...</div>;
    }
  
    if (!user?.username) {
      return (
        <h4 id="title-list">
            Login in to play❗⛔ Click on the links above to
          Sign Up 🎰  or Log In 📡 ❗⛔
        </h4>
      );
    }
  
  // if (!parlays.length) {
  //   return <h3>Where are the picks❗❓</h3>;
  // }

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
      {parlays &&
        parlays.map((parlay) => (
          <div key={parlay._id} className="card mb-3" id="user-parlays">
            <h4 className="card-header" id="single-header">
              {showUsername ? (
               <p>
                <Link
                  className="text-light" to={`/profiles/${parlay.username}`}>
                 <span style={{ fontSize: '2rem' }}>
                 {parlay.name}
                 <p  style={{ fontSize: '1.5rem' }}>Ticket Code: [{parlay.win_choice}]</p>
                <br/> 
                 </span>
                  <span style={{ fontSize: '1rem' }}>
                    Picked On: {parlay.createdAt}
                  </span>
                </Link>
               </p> 
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this pick {parlay.createdAt}
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

export default ParlayList;