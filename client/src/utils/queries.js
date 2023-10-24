import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reservations {
        _id
        name
        win_choice
        createdAt
      }
    }
  }
`;

export const QUERY_RESERVATIONS = gql`
  query getReservations {
    reservations {
      _id
      name
      win_choice
      createdAt
      trucks {
        _id
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
      truckModel
      rentalPrice
    }
  }
`;

export const QUERY_SINGLE_RESERVATION = gql`
  query getSingleReservation($reservationId: ID!) {
    reservation(reservationId: $reservationId) {
      _id
      name
      win_choice
      createdAt
      trucks {
        _id
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
        name
        win_choice
        createdAt
      }
    }
  }
`;
