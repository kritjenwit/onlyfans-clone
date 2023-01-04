require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRESQL_MASTER_USER,
    password: process.env.POSTGRESQL_MASTER_PASS,
    database: process.env.POSTGRESQL_MASTER_DB,
    host: process.env.POSTGRESQL_MASTER_HOST,
    port: process.env.POSTGRESQL_MASTER_PORT,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.POSTGRESQL_MASTER_USER,
    password: process.env.POSTGRESQL_MASTER_PASS,
    database: process.env.POSTGRESQL_MASTER_DB,
    host: process.env.POSTGRESQL_MASTER_HOST,
    port: process.env.POSTGRESQL_MASTER_PORT,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
