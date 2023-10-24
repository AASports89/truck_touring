import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PARLAYS, QUERY_ME, QUERY_USER } from '../utils/queries';

function ParlayForm() {
  
  const [name, setPick] = useState('');
  const [homeTeam, setHome] = useState(' ');
  const [awayTeam, setAway] = useState(' ');
  const [homeOdd, setHOdd] = useState(' ');
  const [awayOdd, setAOdd] = useState(' ');
  
  const { username, user } = useParams();
  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, QUERY_PARLAYS, {
        variables: { username: username },
      });
  const parlay = data?.parlay || [];
  const games = data?.games || [];
 
console.log(parlay, games);

const possibleDate = Date;

  if (loading) {
    return <div>Loading...💸...</div>;
  }
    const handleSetPick = event => {
      setPick(event.target.value)
    };
    const handleSetHome = event => {
      setHome(event.target.value)
    };
    const handleSetAway = event => {
      setAway(event.target.value)
    };
    const handleSetHOdd = event => {
      setHOdd(event.target.value)
    };
    const handleSetAOdd = event => {
      setAOdd(event.target.value)
    };
  const handleSubmit = event => {
    event.preventDefault();
    alert(`Parlay picks, successfully submitted✅ Good Luck!💰
            Parlay Code: ${name} \n
            1st Pick: ${homeTeam} \n
            2nd Pick: ${awayTeam} \n
            3rd Pick: ${homeOdd} \n
            4th Pick: ${awayOdd} \n
            Current Reservation Date: ${possibleDate} \n
            `);
  };
  return (
    <form onSubmit={handleSubmit} className="flex-row justify-center" id="form">
      <div>
        <label id="label">Check The Parlay Randomizer (Optional):</label>
        <input
          type="checkbox"
          name="name"
          onChange={handleSetPick}
          value={[0,1,0,1]}
        />
        <input
          type="checkbox"
          name="name"
          onChange={handleSetPick}
          value={[0,1]}
        />
        <input
          type="checkbox"
          name="name"
          onChange={handleSetPick}
          value={[0,1,0]}
        />
        <input
          type="checkbox"
          name="name"
          onChange={handleSetPick}
          value={[0,0,1]}
        />
        <input
          type="checkbox"
          name="name"
          onChange={handleSetPick}
          value={[1,1,0]}
        />
        <label id="label" for={name}>{name}</label>
      </div>
      <div>
        <label id="label">Select 1 OR More Odds Choices:</label>
        <input
          type="checkbox"
          name="homeTeam"
          onChange={handleSetHome}
          value={[homeTeam -150]}
        />
        <label id="label" for={homeTeam}>{homeTeam}</label>
        <label id="label"></label>
        <input
          type="checkbox"
          name="awayTeam"
          onChange={handleSetAway}
          value={[awayTeam +200]}
        />
         <label id="label" for={awayTeam}>{awayTeam}</label>
        <input
          type="checkbox"
          name="homeOdd"
          onChange={handleSetHOdd}
          value={[homeOdd -1.5]}
        />
        <label id="label" for={homeOdd}>{homeOdd}</label>
        <input
          type="checkbox"
          name="awayOdd"
          onChange={handleSetAOdd}
          value={[awayOdd +3.5]}
        />
        <label id="label" for={awayOdd}>{awayOdd}</label>
      </div>
      <button className='btn' type="submit">
            Add Parlay 💸
      </button>
    </form>
  )
}
export default ParlayForm;