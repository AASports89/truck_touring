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
  mutation addReservation($reservationId: ID!, $title: String!, $date: String!) {
    addReservation(reservationId: $reservationId, title: $title, date: $date) {
      _id
      title
      date
      createdAt
       truck {
        _id
        image
        truckModel
        rentalPrice
      }
    }
  }
`;

export const ADD_TRUCK = gql`
  mutation addTruck ($reservationId: ID!, $image: String!, $truckModel: String!, $rentalPrice: Int!) {
    addTruck(reservationId: $reservationId, image: $image, truckModel: $truckModel, rentalPrice: $rentalPrice) {
      trucks {
        _id
        image
        truckModel
        rentalPrice
      }
    }
  }
`;