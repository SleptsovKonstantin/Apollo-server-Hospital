
const { gql } = require('apollo-server');

const typeDefs = gql`

type User {
  id: ID!
  login: String!
  password: String!
}

type responceUser {
  newToken: String!
  login: String!
}

type Record {
  id: ID!
  name: String!
  doctor: String!
  date: String!
  complaint: String!
  user: String!
}

type Query {
  loginUser(input: UserInput):responceUser
  getAllUsers: [User]
  getRecord(id: ID!): Record
  getAllRecord: [Record]
  sortRecords(user: String): [Record]
  filterRecords(valueInputFilterWith: String, valueInputFilterOn: String, user: String): [Record]
}

input UserInput {
  login: String!
  password: String!
}

input RecordInput {
  name: String!
  doctor: String!
  date: String!
  complaint: String!
  user: String!
}

type Mutation {
  createUser(input: UserInput): responceUser
  createRecord(input: RecordInput): [Record]
  updateRecord(id: ID!, input: RecordInput): [Record]
  deleteRecord(id: ID!): [Record]
}
`

module.exports = typeDefs;