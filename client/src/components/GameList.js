import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';


const GameList = () => {
  const { loading, data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];
  if (!games.length) {
    return <h3>Where is the action❗❓</h3>;
  }
console.log(games);

  return (
      <div>
      {loading ? ( 
        <div>Loading...💸...</div> 
      ) : (
//************************* GAME-INFO: TEAMS & ODDS ******************//
         <div className="flex-row my-4" id="gaming">
          {games && games.map((game) => (
            <div key={game._id} className="card mb-3" id="game-card">
               <div className="p-3 text-light" id="game-card">
                <div id="game-cardss">
                <p><img id="team" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667007982/away_m9lnn0.png" alt="Away"></img></p>
                  <p className="card-body">{game.awayTeam}</p>
                  <p className="card-body">Odds: ({game.awayOdd})</p>
                </div>
                  <p id="vs"><img src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667008346/vs1_mwfonr.png" alt="VS"></img></p>
                <div id="game-cards">
                <p><img id="team" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667007982/home_qpmug9.png" alt="Home"></img></p>
                  <p className="card-body">Home: {game.homeTeam}</p>
                  <p className="card-body">Odds: ({game.homeOdd})</p>  
                </div>
              </div>
              </div>
          ))}
          </div>
      )}
      </div>
  );
          };
export default GameList;