// import config from 'config')
// import jwt from 'jsonwebtoken')
import db from '../../models')

export default async (obj, args, context) => {
  if (!context.scope.includes('verifyTable')) {
    throw new Error('Permission Denied')
  }
  try {
    // const secretKey = config.get('jwt.secret_key')
    // const tokenInfo = await jwt.verify(args.token, secretKey)

    const order = await db.models.Order.findOne({
      where: {
        id: context.order_id,
        restaurant_id: context.restaurant_id
      }
    })
    if (order === null) {
      throw new Error('Invalid Token')
    }
    const restaurant = await order.getRestaurant()
    const tables = await restaurant.getRestaurantTables({
      where: { id: args.table_id }
    })
    if (tables == null || tables.length === 0) {
      throw new Error('Table does not exist')
    }

    await order.setRestaurantTable(tables[0].id)
    return true
  } catch (error) {
    throw error
  }
}
