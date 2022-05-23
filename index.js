const express = require("express")
const cors = require("cors");

const { ApolloServer, gql } = require('apollo-server');

require("dotenv").config();

const app = express();
const db = require("./src/models");

const Record = db.records;

app.use(cors());
app.use(express.json());

// require("./src/routes/index")(app);
// require("./src/routes/record")(app);

db.sequelize.sync();

const typeDefs = gql`

  type User {
    id: ID!
    login: String
    password: String
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
    getAllUsers: [User]
    getRecord(id: ID!): Record
    getAllRecord: [Record]
    sortRecords(user: String): [Record]
    filterRecords(valueInputFilterWith: String, valueInputFilterOn: String, user: String): [Record]
  }

  input UserInput {
    id: ID
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
    createUser(input: UserInput): [User]
    createRecord(input: RecordInput): [Record]
    updateRecord(id: ID!, input: RecordInput): [Record]
    deleteRecord(id: ID!): [Record]
  }

`


const resolvers = {
  Query: {
    getAllRecord: async () => {
      const data = await Record.findAll({
        // where: { user: login },
        order: ["id"],
      })
      return data
    },
    sortRecords: async (_, { user }) => {
      const field = [];

      if (req.body.hasOwnProperty("name")) {
        field.push("name");
        field.push(req.body.name);
      }

      if (req.body.hasOwnProperty("doctor")) {
        field.push("doctor");
        field.push(req.body.doctor);
      }

      if (req.body.hasOwnProperty("data")) {
        field.push("data");
        field.push(req.body.data);
      }

      if (req.body.hasOwnProperty("complaint")) {
        field.push("complaint");
        field.push(req.body.complaint);
      }

      if (req.body.hasOwnProperty("id")) {
        field.push("id");
        field.push(req.body.id);
      }

      const data = await Record.findAll({
        where: { user: user },
        order: [field],
      })
      return data
    },
    filterRecords: async (_, { valueInputFilterWith, valueInputFilterOn, user }) => {
      const bodyObj = {};

      if (valueInputFilterWith !== "" && valueInputFilterOn == "") {
        bodyObj[Op.gte] = valueInputFilterWith;
      }
      if (valueInputFilterWith == "" && valueInputFilterOn !== "") {
        bodyObj[Op.lte] = valueInputFilterOn;
      }
      if (valueInputFilterWith !== "" && valueInputFilterOn !== "") {
        bodyObj[Op.between] = [valueInputFilterWith, valueInputFilterOn];
      }

      const data = await Record.findAll({
        where: {
          data: bodyObj,
          user: user
        }
      })
      return data
    }
  },

  Mutation: {
    createRecord: async (_, { input }) => {
      await Record.create(input).then(() => {
        return data = Record.findAll({
          // where: { user: login },
          order: ["id"],
        })
      })
      return data
    },
    updateRecord: async (_, { id, input }) => {
      await Record.update(input, { where: { id } }).then(() => {
        return data = Record.findAll({
          // where: { user: login },
          order: ["id"],
        })
      })
      return data
    },
    deleteRecord: async (_, { id }) => {
      await Record.destroy({ where: { id } }).then(() => {
        return data = Record.findAll({
          // where: { user: login },
          order: ["id"],
        })
      })
      return data
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Сервер запущен по адресу: ${url}`)
})
