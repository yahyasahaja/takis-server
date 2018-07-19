//DATABASE
// import db from '../../../db'

//TYPES
export const types = {
  RestaurantMenu: {
    async categories(menu) {
      return await menu.getCategories()
    },
    async restaurant(menu) {
      return await menu.getRestaurant()
    }
  }
}

export default types