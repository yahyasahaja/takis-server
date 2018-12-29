'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// for restaurant admin only
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2, _ref3) {
    var id = _ref2.order_id;
    var scope = _ref3.scope,
        user = _ref3.user;
    var order, customerPay, restaurantPay, price;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (scope.includes('payOrder')) {
              _context.next = 2;
              break;
            }

            throw new Error('Permission Denied');

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _models2.default.models.Order.findOne({
              where: {
                id: id
              }
            });

          case 5:
            order = _context.sent;

            if (!(order === null)) {
              _context.next = 8;
              break;
            }

            throw new Error('Invalid Order ID');

          case 8:
            _context.next = 10;
            return user.getPay();

          case 10:
            customerPay = _context.sent;
            _context.next = 13;
            return order.getRestaurant();

          case 13:
            _context.next = 15;
            return _context.sent.getPay();

          case 15:
            restaurantPay = _context.sent;
            _context.next = 18;
            return order.getOrderItems();

          case 18:
            _context.t0 = function (acc, cur) {
              return acc + cur;
            };

            price = _context.sent.reduce(_context.t0, 0);

            if (!(customerPay.balance < price)) {
              _context.next = 22;
              break;
            }

            throw new Error('Balance not enough');

          case 22:

            //TRANSACTION
            customerPay.balance -= price;
            restaurantPay.balance += price;
            _context.next = 26;
            return customerPay.save();

          case 26:
            _context.next = 28;
            return restaurantPay.save();

          case 28:
            order.paid = true;
            _context.next = 31;
            return order.save();

          case 31:
            return _context.abrupt('return', order);

          case 34:
            _context.prev = 34;
            _context.t1 = _context['catch'](2);
            throw _context.t1;

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 34]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();