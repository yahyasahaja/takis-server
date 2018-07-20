//MODULES
// import Sequelize from 'sequelize'

//EVENTS
import { events, DB_CONNECTED } from './events'

//CONNECTION
import connection from './connection'

//MODELS
import {
  Customer,
  Image,
  Order,
  RestaurantMenu,
  Restaurant,
  RestaurantTable,
  Category,
  Invoice,
} from './models'

//MODEL_RELATIONS
Customer.hasMany(Order, { foreignKey: 'customer_id' })
Order.belongsTo(Customer, { foreignKey: 'customer_id' })
Restaurant.hasMany(Order, { foreignKey: 'restaurant_id' })
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })
Order.hasOne(Invoice, { foreignKey: 'order_id' })
Invoice.belongsTo(Order, { foreignKey: 'order_id' })
Order.belongsToMany(RestaurantMenu, { through: 'OrderMenu', foreignKey: 'order_id'})
RestaurantMenu.belongsToMany(Order, { through: 'OrderMenu', foreignKey: 'menu_id'})

Restaurant.hasMany(RestaurantMenu, { foreignKey: 'restaurant_id' })
RestaurantMenu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })
Restaurant.hasMany(RestaurantTable, { foreignKey: 'restaurant_id' })
RestaurantTable.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })
Image.hasOne(Restaurant, { foreignKey: 'profpic' })
Restaurant.belongsTo(Image, { foreignKey: 'profpic' }) 

Image.hasOne(Customer, { foreignKey: 'image_id' })
Customer.belongsTo(Image, { foreignKey: 'image_id'})

Category.belongsToMany(RestaurantMenu, { through: 'MenuCategory', foreignKey: 'category_id'})
RestaurantMenu.belongsToMany(Category, { through: 'MenuCategory', foreignKey: 'menu_id' })

//SEEDS
import { giveSeeds } from './seeders' 

//CONNECT
let force = process.env.NODE_ENV !== 'production'
connection.sync({force}).then(async () => {
  console.log('Database connection has been established successfuly', 'forced?', force)

  events.emit(DB_CONNECTED)
  if (force) await giveSeeds()
}).catch(err => console.log(`Unable to connect to the database: ${err}`))

export default connection