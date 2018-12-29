'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promisesAll = require('promises-all');

var _promisesAll2 = _interopRequireDefault(_promisesAll);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, _ref2) {
    var files = _ref2.files;

    var _ref3, resolve, reject;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _promisesAll2.default.all(files.map(_utils.processUpload));

          case 2:
            _ref3 = _context.sent;
            resolve = _ref3.resolve;
            reject = _ref3.reject;


            if (reject.length) reject.forEach(function (_ref4) {
              var name = _ref4.name,
                  message = _ref4.message;
              return (
                // eslint-disable-next-line no-console
                console.error(name + ': ' + message)
              );
            });

            return _context.abrupt('return', resolve);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();