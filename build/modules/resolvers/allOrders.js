'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, args, context) {
    var searchQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!context.scope.includes('allOrders')) {
              _context.next = 14;
              break;
            }

            _context.prev = 1;

            // TODO:
            // 1. limit by scope (done)
            // 2. limit by context (if the user is customer, show all of
            //    his order logs) (done)
            searchQuery = {};


            searchQuery[context.userType === _config.USER_TYPE.RESTAURANT ? 'restaurant_id' : 'customer_id'] = context.user.id;

            _context.next = 6;
            return _models2.default.models.Order.findAll({ where: searchQuery });

          case 6:
            return _context.abrupt('return', _context.sent);

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);
            throw _context.t0;

          case 12:
            _context.next = 15;
            break;

          case 14:
            throw new Error('Permission Denied');

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();