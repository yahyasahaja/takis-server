import db from '../../models'

export default async (obj, args, context) => {
  if (context.scope.includes('allOrders')) {
    try {
      // TODO:
      // 1. limit by scope (done)
      // 2. limit by context (if the user is customer, show all of
      //    his order logs) (done)
      const searchQuery = {}
      
      searchQuery [
        context.userType === 'Resto'
          ? 'restaurant_id'
          : 'customer_id'
      ] = context.user.id

      return await db.models.Order.findAll({where: searchQuery})
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
