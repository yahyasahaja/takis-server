'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// for restaurant admin only
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2, _ref3) {
    var token = _ref2.token;
    var scope = _ref3.scope;
    var order;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (token) scope = _jsonwebtoken2.default.verify(token, _config.JWT.SECRET_KEY).scope;

            if (scope.includes('markOrderAsPaid')) {
              _context.next = 3;
              break;
            }

            throw new Error('Permission Denied');

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _models2.default.models.Order.findOne({
              where: {
                token: token
              }
            });

          case 6:
            order = _context.sent;

            if (!(order === null)) {
              _context.next = 9;
              break;
            }

            throw new Error('Invalid Order ID');

          case 9:

            order.paid = true;
            _context.next = 12;
            return order.save();

          case 12:
            return _context.abrupt('return', order);

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](3);
            throw _context.t0;

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();