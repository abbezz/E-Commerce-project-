require('dotenv').config();
const Sequelize = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;


const options = {
  host: DB_HOST,
  dialect: 'mysql',
  port: 3307,
  logging: false,
};

const Connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

module.exports = connection;
