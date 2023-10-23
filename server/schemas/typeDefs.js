const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    parlays: [Parlay]!
  }

  type Parlay {
    _id: ID
    name: String
    win_choice: [Int]
    createdAt: String
    games: [Game]!
  }

  type Game {
    _id: ID
    homeTeam: String
    awayTeam: String
    homeOdd: Int
    awayOdd: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    parlays(username: String): [Parlay]
    parlay(parlayId: ID!): Parlay
    games: [Game]
    game(gameId: ID!): Game
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addParlay(name: String!, win_choice: Int!, game: String!): Parlay
    addGame(homeTeam: String!, awayTeam: String!, homeOdd: Int!, awayOdd: Int!): Game
    removeParlay(parlayId: ID!): Parlay
    removeGame(parlayId: ID!, gameId: ID!): Parlay
  }
`;

module.exports = typeDefs;