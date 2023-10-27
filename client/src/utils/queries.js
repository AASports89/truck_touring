import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reservations {
        _id
        title
        date
        createdAt
      }
    }
  }
`;

export const QUERY_RESERVATIONS = gql`
  query getReservations {
    reservations {
      _id
      title
      date
      createdAt
      trucks {
        _id
        image
        truckModel
        rentalPrice
      }
    }
  }
`;

export const QUERY_TRUCKS = gql`
  query getTrucks {
    trucks {
      _id
      image
      truckModel
      rentalPrice
    }
  }
`;

export const QUERY_SINGLE_RESERVATION = gql`
  query getSingleReservation($reservationId: ID!) {
    reservation(reservationId: $reservationId) {
      _id
      title
      date
      createdAt
      trucks {
        _id
        image
        truckModel
        rentalPrice
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      reservations {
        _id
        title
        date
        createdAt
      }
    }
  }
`;
