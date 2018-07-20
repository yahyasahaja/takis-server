import db from '../../models'

export default async (obj, { restaurant_id: id }, context) => {
  if (context.scope.includes('allRestaurantMenus')) 
    throw new Error('Permission Denied')

  try {
    let restaurant_id = id || context.user.id
    
    //if context.user.id is null, this process accessed by customer without restaurant id
    if (restaurant_id) throw new Error('Permission Denied')

    return await db.models.RestaurantMenu.findAll({
      where: { restaurant_id }
    })
  } catch (error) {
    throw error
  }
}
