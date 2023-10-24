import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RESERVATION = gql`
  mutation addReservation($reservationId: ID!) {
    addReservation(reservationId: $reservationId) {
      _id
      date
      createdAt
       truck {
        _id
        truckModel
        rentalPrice
      }
    }
  }
`;

export const ADD_TRUCK = gql`
  mutation addTruck ($reservationId: ID!, $truckModel: String!, $rentalPrice: Int!) {
    addTruck(reservationId: $reservationId, truckModel: $truckModel, rentalPrice: $rentalPrice) {
      trucks {
        _id
        truckModel
        rentalPrice
      }
    }
  }
`;