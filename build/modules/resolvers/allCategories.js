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
    var id = _ref2.restaurant_id;
    var restaurant_id, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (context.scope.includes('allCategories')) {
              _context.next = 2;
              break;
            }

            throw new Error('Permission denied');

          case 2:
            _context.prev = 2;
            restaurant_id = id;

            if (id) {
              _context.next = 8;
              break;
            }

            restaurant_id = context.user.id;

            if (!(context.userType !== 'Resto')) {
              _context.next = 8;
              break;
            }

            throw new Error('Permission denied');

          case 8:
            _context.next = 10;
            return _models2.default.query('\n      select d.id, d.name\n      from restaurants a join restaurantmenus b\n      on a.id = b.restaurant_id\n      join menucategories c\n      on b.id = c.menu_id\n      join categories d\n      on c.category_id = d.id\n      where a.id = ' + restaurant_id + '\n      group by d.id\n    ', {
              raw: true
            });

          case 10:
            res = _context.sent[0];


            console.log(res);
            return _context.abrupt('return', res);

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](2);
            throw _context.t0;

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();