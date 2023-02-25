const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const ToDo = require('../models/ToDo');

const connection = new Sequelize(dbConfig);

ToDo.init(connection);

module.exports = connection;