import React from 'react';
import { useQuery } from '@apollo/client';
import ReservationList from '../components/ReservationList';
import ReservationForm from '../components/ReservationForm';
import { QUERY_RESERVATIONS } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_RESERVATIONS);
  const reservations = data?.reservations || [];
  const user = data?.me || data?.user || {};
 
    if (loading) {
      return <div>Loading...💸...</div>;
    }
    
  return (
  <main>
      <div className="flex-row justify-center">
      <div id="parlay-form"
            className="col-12 col-md-10 mb-3 p-3"
          >
            <ReservationForm />
          </div>
      <div className="flex-row justify-center">
        {loading ? (
          <div>Loading...💸...</div>
          ) : (
        <ReservationList 
        reservations={reservations}
        title= {user.username +'s' + " Reservations"}
        />
        )}
        </div>
        </div>
  </main>
     

  );
};

export default Dashboard;
