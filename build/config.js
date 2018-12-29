'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOG_MODE = exports.LOG_MODE = 'dev';
var DATABASE = exports.DATABASE = {
  DATABASE_NAME: 'sansapp',
  USER: 'sans',
  PASSWORD: 'sans123',
  HOST: 'localhost',
  DIALECT: 'mysql',
  PORT: 3306,
  POOL_SIZE: 10
};

var JWT = exports.JWT = {
  SECRET_KEY: 'iwiguhieuwghewgSansAppSansAja3528352'
};

var USER_TYPE = exports.USER_TYPE = {
  CUSTOMER: 'Customer',
  RESTAURANT: 'Resto',
  GUEST: 'Guest'
};

var CUSTOMER_SCOPE = exports.CUSTOMER_SCOPE = ['allOrders', 'order', 'createOrder', 'addOrderItemsToOrder', 'updateOrderItemInOrder', 'removeOrderItemsFromOrder', 'allCategories', 'allRestaurantMenus', 'allRestaurants', 'customer', 'customerLogin', 'customerRegister', 'verifyEmail', 'payOrder', 'updateCustomer'];

var RESTAURANT_SCOPE = exports.RESTAURANT_SCOPE = ['allOrders', 'order', 'addOrderItemsToOrder', 'updateOrderItemInOrder', 'removeOrderItemsFromOrder', 'allCategories', 'allRestaurantMenus', 'allRestaurants', 'customer', 'restaurantAdminLogin', 'restaurantAdminRegister', 'markOrderAsPaid', 'verifyEmail'];

exports.default = {
  LOG_MODE: LOG_MODE,
  DATABASE: DATABASE,
  JWT: JWT,
  USER_TYPE: USER_TYPE
};