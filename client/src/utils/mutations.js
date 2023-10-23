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

export const ADD_PARLAY = gql`
  mutation addParlay($parlayId: ID!) {
    addParlay(parlayId: $parlayId) {
      _id
      win_choice
      createdAt
       game {
        _id
        homeTeam
        awayTeam
        homeOdd
        awayOdd
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame ($parlayId: ID!, $homeTeam: String!, $awayTeam: String!, $homeOdd: Int!, $awayOdd: Int!) {
    addGame(parlayId: $parlayId, homeTeam: $homeTeam, awayTeam: $awayTeam, homeOdd: $homeOdd, awayOdd: $awayOdd) {
      games {
        _id
        homeTeam
        awayTeam
        homeOdd
        awayOdd
      }
    }
  }
`;