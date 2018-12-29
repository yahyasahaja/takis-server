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

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2, _ref3) {
    var restaurant_id = _ref2.restaurant_id;
    var userType = _ref3.userType,
        user = _ref3.user;
    var order;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            order = {
              restaurant_id: restaurant_id
            };


            if (userType === _config.USER_TYPE.CUSTOMER) order.customer_id = user.id;

            order.token = _jsonwebtoken2.default.sign({
              scope: ['allOrders', 'addOrderItemsToOrder', 'removeOrderItemsFromOrder', 'replaceOrderItemsInOrder'],
              userId: user.id,
              userType: userType
            }, _config.JWT.SECRET_KEY);

            _context.next = 6;
            return _models2.default.models.Order.create(order);

          case 6:
            return _context.abrupt('return', _context.sent);

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();