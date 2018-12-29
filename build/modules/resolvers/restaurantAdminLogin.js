'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2) {
    var email = _ref2.email,
        password = _ref2.password;
    var restoAdmin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models2.default.models.RestaurantAdmin.findOne({
              where: { email: email }
            });

          case 3:
            restoAdmin = _context.sent;

            if (!(restoAdmin === null)) {
              _context.next = 6;
              break;
            }

            throw new Error('No user matches with that email');

          case 6:
            _context.next = 8;
            return _bcrypt2.default.compare(password, restoAdmin.password);

          case 8:
            if (_context.sent) {
              _context.next = 10;
              break;
            }

            throw new Error('Invalid Email or Password');

          case 10:
            _context.next = 12;
            return (0, _utils.sendEmailVerification)(restoAdmin, _config.USER_TYPE.RESTAURANT);

          case 12:
            return _context.abrupt('return', _jsonwebtoken2.default.sign({
              scope: _config.RESTAURANT_SCOPE,
              userId: restoAdmin.id,
              userType: _config.USER_TYPE.RESTAURANT
            }, _config.JWT.SECRET_KEY));

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', _context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();