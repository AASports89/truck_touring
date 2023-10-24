import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TruckList from '../components/TruckList';


import { QUERY_SINGLE_RESERVATION } from '../utils/queries';

const SingleReservation = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { reservationId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RESERVATION, {
    // pass URL parameter
    variables: { reservationid: reservationId },
  });

  const reservation = data?.reservation || {};

  if (loading) {
    return <div>💸...💸</div>;
  }
  return (
    <div className="my-3" id="single-parlay">
      <h3 className="card-header bg-dark text-light" id="single-header">
        {reservation.username} <br />
          had this pick on {reservation.createdAt}
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4" id="blockquote"
        >
          {reservation.name}
        </blockquote>
      </div>

      <div className="my-5">
        <TruckList trucks={reservation.trucks} />
      </div>
      {/* <div className="m-3 p-4" style={{ border: '2px solid #1a1a1a' }}>
        <GameForm parlayId={parlay._id} />
      </div> */}
    </div>
  );
};

export default SingleReservation;