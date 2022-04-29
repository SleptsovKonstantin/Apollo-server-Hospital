const express = require("express")
const cors = require("cors");
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/schema/schema');
require("dotenv").config();

const app = express();
const db = require("./src/models");

app.use(cors());

db.sequelize.sync();

const users = [
  {
    id: 1,
    login: 'konstantin1',
    password: 'Sleptsov1997'
  },
  {
    id: 2,
    login: 'konstantin2',
    password: 'Sleptsov1997'
  }
]
// const createUser = (input) => {

// }

const resolvers = {
  Query: {
    users: () => users
  }, 
  Mutation: {
    createUser: (input) => {
      return users
    }
  }

  // getAllUsers: () => {
  //   return users
  // },
  // getUser: ({id: ID}) => {
  //   return users.find(user => user.id == id)
  // }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Сервер запущен по адресу: ${url}`)
})


