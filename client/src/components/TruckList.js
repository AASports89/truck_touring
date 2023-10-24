import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRUCKS } from '../utils/queries';


const TruckList = () => {
  const { loading, data } = useQuery(QUERY_TRUCKS);
  const trucks = data?.trucks || [];
  if (!trucks.length) {
    return <h3></h3>;
  }
console.log(trucks);

  return (
      <div>
      {loading ? ( 
        <div>Loading...💸...</div> 
      ) : (
//************************* GAME-INFO: TEAMS & ODDS ******************//
         <div className="flex-row my-4" id="gaming">
          {trucks && trucks.map((truck) => (
            <div key={truck._id} className="card mb-3" id="game-card">
               <div className="p-3 text-light" id="game-card">
                <div id="game-cardss">
                <p><img id="team" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667007982/away_m9lnn0.png" alt="Away"></img></p>
                  <p className="card-body">{truck.truckModel}</p>
                  <p className="card-body">Rental Price Total: ({truck.rentalPrice})</p>
                </div>
                  <p id="vs"><img src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667008346/vs1_mwfonr.png" alt="VS"></img></p>
                <div id="game-cards"> 
                </div>
              </div>
              </div>
          ))}
          </div>
      )}
      </div>
  );
          };
export default TruckList;