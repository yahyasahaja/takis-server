'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloUploadServer = require('apollo-upload-server');

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _allRestaurants = require('./allRestaurants');

var _allRestaurants2 = _interopRequireDefault(_allRestaurants);

var _restaurant = require('./restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

var _allRestaurantMenus = require('./allRestaurantMenus');

var _allRestaurantMenus2 = _interopRequireDefault(_allRestaurantMenus);

var _restaurantMenu = require('./restaurantMenu');

var _restaurantMenu2 = _interopRequireDefault(_restaurantMenu);

var _allOrders = require('./allOrders');

var _allOrders2 = _interopRequireDefault(_allOrders);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _allCategories = require('./allCategories');

var _allCategories2 = _interopRequireDefault(_allCategories);

var _customerLogin = require('./customerLogin');

var _customerLogin2 = _interopRequireDefault(_customerLogin);

var _customerRegister = require('./customerRegister');

var _customerRegister2 = _interopRequireDefault(_customerRegister);

var _restaurantAdminLogin = require('./restaurantAdminLogin');

var _restaurantAdminLogin2 = _interopRequireDefault(_restaurantAdminLogin);

var _addOrderItemsToOrder = require('./addOrderItemsToOrder');

var _addOrderItemsToOrder2 = _interopRequireDefault(_addOrderItemsToOrder);

var _removeOrderItemsFromOrder = require('./removeOrderItemsFromOrder');

var _removeOrderItemsFromOrder2 = _interopRequireDefault(_removeOrderItemsFromOrder);

var _replaceOrderItemsInOrder = require('./replaceOrderItemsInOrder');

var _replaceOrderItemsInOrder2 = _interopRequireDefault(_replaceOrderItemsInOrder);

var _markOrderAsPaid = require('./markOrderAsPaid');

var _markOrderAsPaid2 = _interopRequireDefault(_markOrderAsPaid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//MODELS


exports.default = {
  Upload: _apolloUploadServer.GraphQLUpload,
  RestaurantAdmin: {
    restaurant: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(restaurantAdmin) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return restaurantAdmin.getRestaurant();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function restaurant(_x) {
        return _ref.apply(this, arguments);
      };
    }()
  },
  Restaurant: {
    menus: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(restaurant) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return restaurant.getRestaurantMenus();

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function menus(_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  },
  RestaurantMenu: {
    categories: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(restaurantMenu) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return restaurantMenu.getCategories();

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function categories(_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  },
  Order: {
    restaurant: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(order) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return order.getRestaurant();

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function restaurant(_x4) {
        return _ref4.apply(this, arguments);
      };
    }(),
    customer: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(order) {
        var customer;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return order.getCustomer();

              case 2:
                customer = _context5.sent;

                if (!customer) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', customer);

              case 5:
                return _context5.abrupt('return', {
                  id: 0,
                  name: 'Guest',
                  email: ''
                });

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function customer(_x5) {
        return _ref5.apply(this, arguments);
      };
    }(),
    order_items: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(order) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return order.getOrderItems();

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function order_items(_x6) {
        return _ref6.apply(this, arguments);
      };
    }()
  },
  OrderItem: {
    restaurant_menu: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(orderItem) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return orderItem.getRestaurantMenu();

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function restaurant_menu(_x7) {
        return _ref7.apply(this, arguments);
      };
    }()
  },
  Query: {
    allRestaurants: _allRestaurants2.default,
    restaurant: _restaurant2.default,
    allRestaurantMenus: _allRestaurantMenus2.default,
    restaurantMenu: _restaurantMenu2.default,
    allOrders: _allOrders2.default,
    order: _order2.default,
    allCategories: _allCategories2.default,
    uploads: function uploads() {
      return _models2.default.models.Upload.findAll();
    }
  },
  Mutation: {
    customerLogin: _customerLogin2.default,
    customerRegister: _customerRegister2.default,
    restaurantAdminLogin: _restaurantAdminLogin2.default,
    addOrderItemsToOrder: _addOrderItemsToOrder2.default,
    removeOrderItemsFromOrder: _removeOrderItemsFromOrder2.default,
    replaceOrderItemsInOrder: _replaceOrderItemsInOrder2.default,
    markOrderAsPaid: _markOrderAsPaid2.default
  }
};