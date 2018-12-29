'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2, context) {
    var id = _ref2.id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!context.scope.includes('restaurantAdmin')) {
              _context.next = 16;
              break;
            }

            _context.prev = 1;

            if (id) {
              _context.next = 6;
              break;
            }

            id = context.user.id;

            if (!(context.userType !== 'Resto')) {
              _context.next = 6;
              break;
            }

            throw new Error('Permission Denied');

          case 6:
            _context.next = 8;
            return _models2.default.models.RestaurantAdmin.findById(id);

          case 8:
            return _context.abrupt('return', _context.sent);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);
            throw _context.t0;

          case 14:
            _context.next = 17;
            break;

          case 16:
            throw new Error('Permission Denied');

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();