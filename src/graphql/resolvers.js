const { SECRET_KEY, SALT_ROUNDS } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = SECRET_KEY;
const db = require("../models/index");
const User = db.users;
const Record = db.records;

const createToken = (logChange) => {
  const token = jwt.sign({ logChange }, privateKey, { expiresIn: "24h" });
  return token;
};

const resolvers = {
  Query: {
    loginUser: async (_, { input }) => {
      const { login, password } = input;
      const user = await User.findOne({ where: { login } });
      const result = bcrypt.compareSync(password, user.password)

      if (result) {
        const newToken = createToken(login);
        const responceUser = { newToken, login };
        return responceUser
      }

    },
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
    createUser: async (_, { input }) => {
      const { login, password } = input;
      const hash = bcrypt.hashSync(password, Number(SALT_ROUNDS));
      const newUser = {
        login,
        password: hash,
      };
      const data = await User.create(newUser).then(() => {
        const newToken = createToken(login);
        const responceUser = { newToken, login };
        return responceUser
      })
      return data
    },
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

module.exports = resolvers