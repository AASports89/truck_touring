const axios = require('axios').default;
const fs = require('fs');

/**
 * Calls v4 of The Odds API and returns odds data in a tabular structure
 * For details, see https://the-odds-api.com/liveapi/guides/v4/#parameters-2
 *
 * @param {string} apiKey Get an API key from https://the-odds-api.com/#get-access
 * @param {string} pick_up_location
 * @param {string} pickup_date Comma separated list of betting markets. Valid values are h2h, spreads & totals
 * @param {String} return_date
 * @return {object} A dictionary containing keys for metaData and eventData, each with a value as a 2D array (tabular) for easy output to a spreadsheet. If the request fails, event_data will be null.
 */
function fetchRentals() {
  const url = `https://sky-scanner3.com/`;
  const apiKey = '3471971288mshbceadf7913233b2p1d3080jsn2e8e12bbe2ad'; // Get an API key from https://the-odds-api.com/#get-access
  const pick_up_location = '95565058';
  const pickup_date = '2023-09-05';
  const return_date = '2023-10-30';
  
  axios.get(url, {
    params: {
        apiKey,
        pick_up_location,
        pickup_date,
        return_date
    }
  })
    .then(response => {
      fs.writeFile('./server/seeders/trucks.json', JSON.stringify(response.data), (err) => {
        if(err){
          console.log(err);
        }
        else {
          console.log("File written succesfully");
        }
      });
      console.log('Remaining requests',response.headers['x-requests-remaining'])
      console.log('Used requests',response.headers['x-requests-used'])

    }).catch(error => {
      console.log('Error status', error)
    });
}

console.log(fetchRentals());