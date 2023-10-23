import React from 'react';
import { useQuery } from '@apollo/client';
import ParlayList from '../components/ParlayList';
import ParlayForm from '../components/ParlayForm';
import { QUERY_PARLAYS } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_PARLAYS);
  const parlays = data?.parlays || [];
 
    if (loading) {
      return <div>Loading...💸...</div>;
    }
    
  return (
  <main>
      <div className="flex-row justify-center">
      <div id="parlay-form"
            className="col-12 col-md-10 mb-3 p-3"
          >
            <ParlayForm />
          </div>
      <div className="flex-row justify-center">
        {loading ? (
          <div>Loading...💸...</div>
          ) : (
        <ParlayList 
        parlays={parlays}
        title="Winner...Winner 💰...Chicken...Dinner 🐔"
        />
        
        )}
        </div>
        </div>
  </main>
     

  );
};

export default Dashboard;
