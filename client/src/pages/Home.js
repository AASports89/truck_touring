import React from 'react';

import GameList from '../components/GameList';

var date = (new Date()).toString().split(' ').splice(1,3).join(' ');
document.write(date);

const Home = () => {

  return (
    <main> 
      <div className="flex-row justify-center">
      <h5 id="list-title">
        Reservations: {date} <i class="fa-regular fa-calendar-check"></i>
      </h5>
          <GameList />
        </div>
    </main>
  );
};

export default Home;