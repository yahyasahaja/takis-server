'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import db from '../../models'

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2, _ref3) {
    var input = _ref2.input;
    var scope = _ref3.scope,
        user = _ref3.user;
    var key;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!scope.includes('updateRestaurantAdmin')) {
              _context.next = 14;
              break;
            }

            _context.prev = 1;

            if (input.email) user.verification_token = null;

            for (key in input) {
              user[key] = input[key];
            }_context.next = 6;
            return user.save();

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