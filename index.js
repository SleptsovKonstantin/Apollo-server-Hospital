require("dotenv").config();
const express = require("express")
const cors = require("cors");

const { ApolloServer } = require('apollo-server');
const app = express();
const db = require("./src/models");

app.use(cors());
app.use(express.json());

const typeDefs = require('./src/graphql/typeDefs')
const resolvers = require('./src/graphql/resolvers')

db.sequelize.sync();

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Сервер запущен по адресу: ${url}`)
})
