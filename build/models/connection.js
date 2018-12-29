'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATABASE_NAME = _config.DATABASE.DATABASE_NAME,
    dialect = _config.DATABASE.DIALECT,
    host = _config.DATABASE.HOST,
    PASSWORD = _config.DATABASE.PASSWORD,
    max = _config.DATABASE.POOL_SIZE,
    port = _config.DATABASE.PORT,
    USER = _config.DATABASE.USER;


var connection = new _sequelize2.default(DATABASE_NAME, USER, PASSWORD, {
  dialect: dialect,
  host: host,
  port: port,
  logging: false,
  pool: {
    min: 1,
    max: max,
    acquire: 30000,
    idle: 1000
  },
  operatorsAliases: false
});

exports.default = connection;