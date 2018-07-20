import db from '../../models')

export default async (obj, args, context) => {
  if (!context.scope.includes('removeOrderItemFromOrder')) {
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

    await db.models.OrderItem.destroy({
      where: {
        order_id: order.id,
        id: args.order_item_id
      }
    })
    return true
  } catch (error) {
    throw error
  }
}
