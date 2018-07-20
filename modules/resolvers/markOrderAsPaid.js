import db from '../../models')

// for restaurant admin only
export default async (obj, args, context) => {
  if (!context.scope.includes('markOrderAsPaid')) {
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

    order.paid = true
    await order.save()

    return true
  } catch (error) {
    throw error
  }
}
