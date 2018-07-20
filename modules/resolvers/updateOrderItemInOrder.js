import db from '../../models')

export default async (obj, args, context) => {
  if (!context.scope.includes('updateOrderItemInOrder')) {
    throw new Error('Permission Denied')
  }

  try {
    const order = await db.models.Order.findOne({
      where: {
        id: args.order_id,
        restaurant_id: context.user.restaurant_id
      }
    })
    if (order === null) {
      throw new Error('Invalid Order ID')
    }
    const orderItem = await db.models.OrderItem.findOne({
      where: {
        id: args.order_item_id,
        order_id: order.id
      }
    })
    await db.models.OrderItem.update(
      Object.assign({}, orderItem.dataValues, args.order_item),
      {
        where: {
          id: args.order_item_id,
          order_id: order.id
        }
      }
    )

    return true
  } catch (error) {
    throw error
  }
}
