const db = require('../config/connection');
const { User, Parlay, Game } = require('../models');
const userSeeds = require('./userSeeds.json');
const parlaySeeds = require('./parlayBets.json');
const gameSeeds = require('./games.json');

const reformattedGames = gameSeeds.map(element => {

  const home_team = element.home_team;
  const away_team = element.away_team;
  let home_odd;
  let away_odd;
  const outcomes = element.bookmakers[0].markets[0].outcomes;

  if(outcomes[0].name === home_team) {
    home_odd = outcomes[0].price;
    away_odd = outcomes[1].price;
  } else {
    home_odd = outcomes[1].price;
    away_odd = outcomes[0].price;
  }

  const gameObj = {
    homeTeam: home_team,
    awayTeam: away_team,
    homeOdd: home_odd,
    awayOdd: away_odd
  }

  return gameObj;
});

db.once('open', async () => {
  
    await User.deleteMany({});
    await Parlay.deleteMany({});
    await Game.deleteMany({});
  
  const users = await User.create(userSeeds);
  const parlays = await Parlay.insertMany(parlaySeeds);
  const games = await Game.insertMany(reformattedGames);

  console.log(games);

  for (let i = 0; i < parlaySeeds.length; i++) {
    const { _id, username } = await Parlay.create(parlaySeeds[i]);
    const user = await User.findOneAndUpdate(
      { username: username },
      {
        $addToSet: {
          parlays: _id,
        },
      }
    );
  }

  for(newParlay of parlays) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.parlays.push(newParlay._id);
    await tempUser.save();

    let usedNums = [];
    let count = 0;
    while(count < 5){
      let rand = Math.floor(Math.random()*games.length);
      if(usedNums.indexOf(rand) === -1) {
        newParlay.games.push(games[rand]._id);
        usedNums.push(rand);
        count++;
      }
    }
    await newParlay.save();
  }

  console.log('Success ✅ Seeds planted 🎄');
  process.exit(0);
});