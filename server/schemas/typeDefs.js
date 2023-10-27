const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reservations: [Reservation]!
  }

  type Reservation {
    _id: ID
    title: String
    date: String
    createdAt: String
    trucks: [Truck]!
  }

  type Truck {
    _id: ID
    image: String
    truckModel: String
    rentalPrice: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    reservations(username: String): [Reservation]
    reservation(reservationId: ID!): Reservation
    trucks: [Truck]
    truck(truckId: ID!): Truck
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReservation(title: String!, date: String!, truck: String!): Reservation
    addTruck(image: String!, truckModel: String!, rentalPrice: Int!): Truck
    removeReservation(reservationId: ID!): Reservation
    removeTruck(reservationId: ID!, truckId: ID!): Reservation
  }
`;

module.exports = typeDefs;