import db from '../../models'

export default async (obj, arg, context) => {
  if (context.scope.includes('allRestaurants') && context.userType === 'Resto') {
    try {
      return await db.models.Restaurant.findAll()
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
