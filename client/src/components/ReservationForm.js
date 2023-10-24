import React, { FontAwesomeIcon, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_RESERVATIONS, QUERY_ME, QUERY_USER } from '../utils/queries';

function ReservationForm() {
  
  const [name, setReservation] = useState('');
  const [date, setDate] = useState('');
  const [truckModel, setTruck] = useState(' ');
  const [rentalPrice, setPrice] = useState(' ');
  
  const { username, user } = useParams();
  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, QUERY_RESERVATIONS, {
        variables: { username: username },
      });
  const reservation = data?.reservation || [];
  const trucks = data?.trucks || [];
 
console.log(reservation, trucks);

if (loading) {
    return <div>Loading...💸...</div>;
  }
    const handleSetReservation = event => {
      setReservation(event.target.value)
    };
    const handleSetTruck = event => {
      setTruck(event.target.value)
    };
    const handleSetDate = event => {
      setDate(event.target.value)
    };
    const handleSetPrice = event => {
      setPrice(event.target.value)
    };
  const handleSubmit = event => {
    event.preventDefault();
    alert(`Reservation request, successfully submitted ${<i id="success" class="fa-solid fa-circle-check"></i>}
            Reservation: ${name} \n
            Truck: ${truckModel} \n
            Rental Price Total: ${rentalPrice} \n
            Current Reservation Date: ${date} \n
            `);
  };
  return (
    <form onSubmit={handleSubmit} className="flex-row justify-center" id="form">
      <div>
        <label id="label">Select Reservation:</label>
        <input
          type="checkbox"
          name="name"
          onChange={handleSetReservation}
          value={[0,1,0,1]}
        />
        <label id="label" for={name}>{name}</label>
      </div>
      <div>
        <label id="label">Select Desired Truck Make & Model:</label>
        <input
          type="checkbox"
          name="truckModel"
          onChange={handleSetTruck}
          value={[truckModel]}
        />
        <label id="label" for={date}>{date}</label>
        <label id="label"></label>
        <input
          type="checkbox"
          name="date"
          onChange={handleSetDate}
          value={[date]}
        />
         <label id="label" for={rentalPrice}>{rentalPrice}</label>
        <input
          type="checkbox"
          name="rentalPrice"
          onChange={handleSetPrice}
          value={[rentalPrice]}
        />
      </div>
      <button className='btn' type="submit">
            Request Reservation <FontAwesomeIcon icon="fa-solid fa-calendar-plus" />
      </button>
    </form>
  )
}
export default ReservationForm;