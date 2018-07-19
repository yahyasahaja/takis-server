//MODULES
import bcrypt from 'bcrypt'

//DATABASE
// import db from '../db'

//MODELS
import {
  Restaurant,
  RestaurantTable,
  RestaurantMenu,
  Order,
  Category,
  MenuCategory,
} from '../models'

//SEEDS
import restaurants from './restaurants.json'
import restaurant_tables from './restaurant_tables.json'
import restaurant_menu from './restaurant_menu.json'
import categories from './categories.json'
import menu_categories from './menu_categories.json'

//SEEDERS
export const giveSeeds = async () => {
  let loc
  loc
  //ADD RESTAURANT SEEDS
  await Restaurant.destroy({ where: {}, force: true })
  for (let restaurant of restaurants)
    restaurant.password = await bcrypt.hash(restaurant.password, 12)
  loc = await Restaurant.bulkCreate(restaurants)

  //ADD RESTAURANT TABLES SEEDS
  await RestaurantTable.destroy({ where: {}, force: true })
  loc = await RestaurantTable.bulkCreate(restaurant_tables)
  // loc = await Restaurant.findOne({where: {id: 1}})
  // console.log(await loc.getRestaurantTables({where: {id: 1}}))
  // console.log(loc)
 
  await Category.destroy({ where: {}, force: true })
  await Category.bulkCreate(categories)

  await RestaurantMenu.destroy({ where: {}, force: true })
  loc = await RestaurantMenu.bulkCreate(restaurant_menu)

  await MenuCategory.destroy({ where: {}, force: true })
  await MenuCategory.bulkCreate(menu_categories)
  
  await Order.create({
    id: 1,
    valid_until: Date.now() + 7200000000,
    restaurant_id: 1,
  })
}

export default {
  giveSeeds,
}