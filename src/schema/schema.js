const {gql} = require('apollo-server');

const typeDefs = gql`

type User {
  id: ID!
  login: String
  password: String
}

input UserInput {
  id: ID!
  login: String
  password: String
}

type Query {
  users: [User]
}

type Mutation {
  createUser(input: UserInput): User
}

`

module.exports = typeDefs;

  // getAllUsers: [User]
  // getUser(id: ID): User
