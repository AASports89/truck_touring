import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      parlays {
        _id
        name
        win_choice
        createdAt
      }
    }
  }
`;

export const QUERY_PARLAYS = gql`
  query getParlays {
    parlays {
      _id
      name
      win_choice
      createdAt
      games {
        _id
        homeTeam
        awayTeam
      }
    }
  }
`;

export const QUERY_GAMES = gql`
  query getGames {
    games {
      _id
      homeTeam
      awayTeam
      homeOdd
      awayOdd
    }
  }
`;

export const QUERY_SINGLE_PARLAY = gql`
  query getSingleParlay($parlayId: ID!) {
    parlay(parlayId: $parlayId) {
      _id
      name
      win_choice
      createdAt
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      parlays {
        _id
        name
        win_choice
        createdAt
      }
    }
  }
`;
