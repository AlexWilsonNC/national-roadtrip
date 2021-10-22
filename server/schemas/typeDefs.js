const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String,
    itinerary:[String]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth

    addItinerary(userId: ID!, itinerary: String!): User
    removeItinerary(userId: ID!, itinerary: String!): User
  }
`;

module.exports = typeDefs;
