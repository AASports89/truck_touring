import React from 'react';

import TruckList from '../components/TruckList';

var date = (new Date()).toString().split(' ').splice(1,3).join(' ');
document.write(date);

const Home = () => {

  return (
    <main> 
      <div className="flex-row justify-center">
      <h5 id="list-title">
        Reservations: {date} <i class="fa-regular fa-calendar-check"></i>
      </h5>
          <TruckList />
        </div>
    </main>
  );
};

export default Home;