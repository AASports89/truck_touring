import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_PARLAYS } from '../utils/queries';

var date = (new Date()).toString().split(' ').splice(1,3).join(' ');
document.write(date);

const Parlays = () => {

  const { loading, data } = useQuery(QUERY_PARLAYS);
  const parlays = data?.parlays || [];
  if (!parlays.length) {
    return <h3>Where is the action❗❓</h3>;
  }
console.log(parlays);

// const { username } = useParams();
// const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, QUERY_PARLAYS, {
//       variables: { username: username },
//     });
  
    // const user = data?.me || data?.user || {};
    
    // if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    //   return <Navigate to="/parlays"/>;
    // }
  
    // if (loading) {
    //   return <div>Loading...💸...</div>;
    // }
  
    // if (!user?.username) {
    //   return (
    //     <h4>
    //         Login in to play❗⛔ Click on the links above to
    //       Sign Up 🎰  or Log In 📡 ❗⛔
    //     </h4>
    //   );
    // }
  
    // return (
      return (
        <div>
        {loading ? ( 
          <div>Loading...💸...</div> 
        ) : (
      //************************* PARLAY-INFO: NAME & WIN_CHOICE ******************//
      
      <div className="flex-row justify-center" id="parlaying">
        <div className="flex-row justify-center">
          <h5 id="par-title">
          Parlays for: {date} 📋
          </h5>
          </div>
        {parlays && parlays.map((parlay) => (
        <div key={parlay._id} className="card mb-3" id="game-cardss">
              <p className="card-body">{parlay.name}</p>
              <p className="card-body"> Ticket Code: [{parlay.win_choice}]</p>
              {parlay.games && parlay.games.map((game)=> (
                <div key={game._id}>
                  <p>{game.homeTeam} vs {game.awayTeam}</p>
                </div>
              ))}
            </div>
      ))}
      </div>
  )};
    </div>
  );
          };
      {/* <div>
        <div className="flex-row justify-center" id="action-div">
          <h2 className="col-12 col-md-10 mb-3 p-3" id="parlay-title">
            Welcome! {Auth.getProfile().data.username}: Dashboard 🎛️
          </h2>
  
              <div className="col-12 col-md-10 mb-5">
                <ParlayList
              parlays={user.parlays}
              title={`${user.username}'s picks...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
          {!username && (
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '1px dotted #1a1a1a' }}
            >
              <ParlayForm />
            </div>
          )}
        </div>
      </div>
    );
  }; */}
  
  export default Parlays;
  