module.exports = {
    HOST: "localhost",
    USER: "konstantinslepcov", //"postgres" konstantinsleptsov
    PASSWORD: "user",
    DB: "db_graphql",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};