'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//CONNECTION
//MODULES
var connection = exports.connection = new _sequelize2.default(_config.DATABASE.DATABASE_NAME, _config.DATABASE.USER, _config.DATABASE.PASSWORD, {
  host: _config.DATABASE.HOST,
  dialect: _config.DATABASE.DIALECT,
  port: _config.DATABASE.PORT,
  pool: {
    max: _config.DATABASE.POOL_SIZE,
    min: 0,
    acquire: 30000,
    idle: 1000
  },
  logging: false,
  operatorsAliases: {
    $eq: _sequelize.Op.eq,
    $ne: _sequelize.Op.ne,
    $gte: _sequelize.Op.gte,
    $gt: _sequelize.Op.gt,
    $lte: _sequelize.Op.lte,
    $lt: _sequelize.Op.lt,
    $not: _sequelize.Op.not,
    $in: _sequelize.Op.in,
    $notIn: _sequelize.Op.notIn,
    $is: _sequelize.Op.is,
    $like: _sequelize.Op.like,
    $notLike: _sequelize.Op.notLike,
    $iLike: _sequelize.Op.iLike,
    $notILike: _sequelize.Op.notILike,
    $regexp: _sequelize.Op.regexp,
    $notRegexp: _sequelize.Op.notRegexp,
    $iRegexp: _sequelize.Op.iRegexp,
    $notIRegexp: _sequelize.Op.notIRegexp,
    $between: _sequelize.Op.between,
    $notBetween: _sequelize.Op.notBetween,
    $overlap: _sequelize.Op.overlap,
    $contains: _sequelize.Op.contains,
    $contained: _sequelize.Op.contained,
    $adjacent: _sequelize.Op.adjacent,
    $strictLeft: _sequelize.Op.strictLeft,
    $strictRight: _sequelize.Op.strictRight,
    $noExtendRight: _sequelize.Op.noExtendRight,
    $noExtendLeft: _sequelize.Op.noExtendLeft,
    $and: _sequelize.Op.and,
    $or: _sequelize.Op.or,
    $any: _sequelize.Op.any,
    $all: _sequelize.Op.all,
    $values: _sequelize.Op.values,
    $col: _sequelize.Op.col
  }
});

//DATABASE_CONFIGURATION
exports.default = connection;