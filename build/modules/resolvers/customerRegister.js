'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2) {
    var email = _ref2.email,
        password = _ref2.password,
        name = _ref2.name;
    var duplicatedUser, user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models2.default.models.Customer.findOne({
              where: {
                email: email
              }
            });

          case 3:
            duplicatedUser = _context.sent;

            if (!duplicatedUser) {
              _context.next = 6;
              break;
            }

            throw new Error('User with same email already exist');

          case 6:
            _context.t0 = _models2.default.models.Customer;
            _context.t1 = email;
            _context.t2 = name;
            _context.next = 11;
            return _bcrypt2.default.hash(password, 12);

          case 11:
            _context.t3 = _context.sent;
            _context.t4 = {
              email: _context.t1,
              name: _context.t2,
              password: _context.t3
            };
            _context.next = 15;
            return _context.t0.create.call(_context.t0, _context.t4);

          case 15:
            user = _context.sent;
            token = _jsonwebtoken2.default.sign({
              scope: _config.CUSTOMER_SCOPE,
              userId: user.id,
              userType: _config.USER_TYPE.CUSTOMER
            }, _config.JWT.SECRET_KEY);
            _context.next = 19;
            return (0, _utils.sendEmailVerification)(user, _config.USER_TYPE.CUSTOMER);

          case 19:
            return _context.abrupt('return', token);

          case 22:
            _context.prev = 22;
            _context.t5 = _context['catch'](0);
            return _context.abrupt('return', _context.t5);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 22]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();