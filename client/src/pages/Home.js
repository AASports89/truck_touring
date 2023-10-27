import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRUCKS } from '../utils/queries';


const Home = () => {
    const { loading, data } = useQuery(QUERY_TRUCKS);
    const trucks = data?.trucks || [];
    if (!trucks.length) {
        return <h3></h3>;
    }
    console.log(trucks);
return (
    <main> 
      <div className="flex-row justify-center">
      <h5 id="list-title">
        Reservations: {Date} <i class="fa-regular fa-calendar-check"></i>
      </h5>
          {trucks.map((truck) => (
              <div className="card mb-3" id="user-parlays">{truck}</div>
          ))}
        </div>
    </main>
  );
};

export default Home;