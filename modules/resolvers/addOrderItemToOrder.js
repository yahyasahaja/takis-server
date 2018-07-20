import db from '../../models'

export default async (obj, args, context) => {
  if (!context.scope.includes('addOrderItemToOrder')) {
    throw new Error('Permission Denied')
  }

  try {
    const order = await db.models.Order.findOne({
      where: {
        id: args.order_id,
        restaurant_id: context.user.restaurant_id
      }
    })
    console.log(
      'OrderID: ',
      args.order_id,
      'RID: ',
      context.user.restaurant_id
    )
    if (order === null) {
      throw new Error('Invalid Order ID')
    }
    const newOrderItem = await db.models.OrderItem.create(
      Object.assign({}, args.order_item, {
        order_id: order.id
      })
    )
    return true
  } catch (error) {
    throw error
  }
}
