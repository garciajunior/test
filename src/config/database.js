require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT|| "postgres",
  storage:'./__teste__/database.sqlite',
  operatorAliases: false,
  logging: false,
  define: {
    timestamp: true,
    underscore: true,
    underscoreAll: true,
  },
};
