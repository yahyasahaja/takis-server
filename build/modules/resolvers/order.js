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
            if (!context.scope.includes('order')) {
              _context.next = 2;
              break;
            }

            throw new Error('Permission Denied');

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _models2.default.models.Order.findById(id);

          case 5:
            return _context.abrupt('return', _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](2);
            throw _context.t0;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();