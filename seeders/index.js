//MODULES
import bcrypt from 'bcrypt'

//DATABASE
// import db from '../db'

//MODELS
import db from '../models/connection'

const {
  Restaurant,
  RestaurantMenu,
  // Order,
  Category,
  MenuCategory,
} = db.models

//SEEDS
import restaurants from './restaurants.json'
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
 
  await Category.destroy({ where: {}, force: true })
  await Category.bulkCreate(categories)

  await RestaurantMenu.destroy({ where: {}, force: true })
  loc = await RestaurantMenu.bulkCreate(restaurant_menu)

  await MenuCategory.destroy({ where: {}, force: true })
  await MenuCategory.bulkCreate(menu_categories)
}

export default {
  giveSeeds,
}