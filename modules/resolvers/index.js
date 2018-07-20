import allRestaurants from './allRestaurants')
import restaurant from './restaurant')
import allRestaurantMenus from './allRestaurantMenus')
import restaurantMenu from './restaurantMenu')
import allOrders from './allOrders')
import order from './order')
import currentRestaurant from './currentRestaurant')
import currentRestaurantAdmin from './currentRestaurantAdmin')
import currentOrder from './currentOrder')
import allCategories from './allCategories')

import customerLogin from './customerLogin')
import customerRegister from './customerRegister')
import restaurantAdminLogin from './restaurantAdminLogin')
import verifyAndGetRestaurantToken from './verifyAndGetRestaurantToken')
import verifyTable from './verifyTable')
import updateOrder from './updateOrder')
import addOrderItemToOrder from './addOrderItemToOrder')
import removeOrderItemFromOrder from './removeOrderItemFromOrder')
import updateOrderItemInOrder from './updateOrderItemInOrder')
import markOrderAsPaid from './markOrderAsPaid')

export default {
  Order: {
    restaurant: async order => {
      return await order.getRestaurant()
    },
    customer: async order => {
      let customer = await order.getCustomer()
      if (customer) return customer

      return {
        id: 0,
        name: 'Guest',
        email: ''
      }
    }
  },
  Query: {
    allRestaurants,
    restaurant,
    allRestaurantMenus,
    restaurantMenu,
    allOrders,
    order,
    currentRestaurant,
    currentOrder,
    currentRestaurantAdmin,
    allCategories
  },
  Mutation: {
    customerLogin,
    customerRegister,
    restaurantAdminLogin,
    verifyAndGetRestaurantToken,
    verifyTable,
    updateOrder,
    addOrderItemToOrder,
    removeOrderItemFromOrder,
    updateOrderItemInOrder,
    markOrderAsPaid
  }
}
