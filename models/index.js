import connection from './connection'
import { events, DB_CONNECTED } from '../events'

// import User from './User')
import Customer from './Customer'
import Category from './Category'
import OrderItem from './OrderItem'
import Order from './Order'
import RestaurantMenu from './RestaurantMenu'
import RestaurantAdmin from './RestaurantAdmin'
import Restaurant from './Restaurant'
import SocialMedia from './SocialMedia'
import Pay from './Pay'
import './MenuCategory'
import './Upload'

// associate Restaurant with RestaurantMenu
Restaurant.hasMany(RestaurantMenu, { foreignKey: 'restaurant_id' })
RestaurantMenu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })

// associate RestaurantAdmin with Restaurant
RestaurantAdmin.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })
Restaurant.hasOne(RestaurantAdmin, { foreignKey: 'restaurant_id' })

// associate Restaurant with Pay
Pay.hasOne(Restaurant, { foreignKey: 'pay_id' })
Restaurant.belongsTo(Pay, { foreignKey: 'pay_id' })

// associate Customer with Pay
Pay.hasOne(Customer, { foreignKey: 'pay_id' })
Customer.belongsTo(Pay, { foreignKey: 'pay_id' })

// associate SocialMedia with Restaurant
SocialMedia.hasOne(Restaurant, { foreignKey: 'soscial_media_id' })
Restaurant.belongsTo(SocialMedia, { foreignKey: 'social_media_id' })

// associate RestaurantMenu with Category
RestaurantMenu.belongsToMany(Category, {
  through: 'MenuCategory',
  foreignKey: 'menu_id',
  as: 'categories'
})
Category.belongsToMany(RestaurantMenu, {
  through: 'MenuCategory',
  foreignKey: 'category_id'
})

// associate OrderItem with RestaurantMenu
RestaurantMenu.hasOne(OrderItem, { foreignKey: 'menu_id' })
OrderItem.belongsTo(RestaurantMenu, {
  foreignKey: 'menu_id',
  as: 'restaurant_menu'
})

// associate Order with Restaurant, Customer, OrderItem
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' })
Restaurant.hasMany(Order, { foreignKey: 'restaurant_id' })
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' })
Customer.hasMany(Order, { foreignKey: 'customer_id' })
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'order_items' })
OrderItem.belongsTo(Order, { foreignKey: 'order_id' })

import { giveSeeds } from '../seeders'

let force = true

connection
  .sync({
    force
  })
  .then(async () => {
    console.log('database synchronized')

    events.emit(DB_CONNECTED)
    if (force) giveSeeds()
  })
  .catch(err => {
    console.log(err)
  })
  
export default connection
