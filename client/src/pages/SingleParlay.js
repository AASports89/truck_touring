import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GameList from '../components/GameList';


import { QUERY_SINGLE_PARLAY } from '../utils/queries';

const SingleParlay = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { parlayId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PARLAY, {
    // pass URL parameter
    variables: { parlayid: parlayId },
  });

  const parlay = data?.parlay || {};

  if (loading) {
    return <div>💸...💸</div>;
  }
  return (
    <div className="my-3" id="single-parlay">
      <h3 className="card-header bg-dark text-light" id="single-header">
        {parlay.username} <br />
          had this pick on {parlay.createdAt}
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4" id="blockquote"
        >
          {parlay.name}
        </blockquote>
      </div>

      <div className="my-5">
        <GameList games={parlay.games} />
      </div>
      {/* <div className="m-3 p-4" style={{ border: '2px solid #1a1a1a' }}>
        <GameForm parlayId={parlay._id} />
      </div> */}
    </div>
  );
};

export default SingleParlay;