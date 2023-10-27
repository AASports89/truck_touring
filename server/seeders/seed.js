const db = require('../config/connection');
const { User, Reservation, Truck } = require('../models');
const userSeeds = require('./userSeeds.json');
const reservationSeeds = require('./reservationDates.json');
const truckSeeds = require('./truckSeeds.json');

db.once('open', async () => {
  
    await User.deleteMany({});
    await Reservation.deleteMany({});
    await Truck.deleteMany({});
  
  const users = await User.create(userSeeds);
  const reservations = await Reservation.insertMany(reservationSeeds);
  const trucks = await Truck.insertMany(truckSeeds);

  console.log(trucks);

  for (let i = 0; i < reservationSeeds.length; i++) {
    const { _id, username } = await Reservation.create(reservationSeeds[i]);
    const user = await User.findOneAndUpdate(
      { username: username },
      {
        $addToSet: {
          reservations: _id,
        },
      }
    );
  }

  for(newReservation of reservations) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.reservations.push(newReservation._id);
    await tempUser.save();

    let usedNums = [];
    let count = 0;
    while(count < 5){
      let rand = Math.floor(Math.random()*games.length);
      if(usedNums.indexOf(rand) === -1) {
        newReservation.trucks.push(trucks[rand]._id);
        usedNums.push(rand);
        count++;
      }
    }
    await newReservation.save();
  }

  console.log('Success ✅ Seeds planted 🎄');
  process.exit(0);
});