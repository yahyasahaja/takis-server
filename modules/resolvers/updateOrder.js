import db from '../../models')

export default async (obj, args, context) => {
  if (!context.scope.includes('updateOrder')) {
    throw new Error('Permission Denied')
  }

  try {
    const orderItems = args.items

    orderItems.forEach(async orderItem => {
      await db.models.OrderItem.create({
        ...orderItem,
        order_id: context.order_id
      })
    })
    const order = await db.models.Order.findById(context.order_id, {
      include: [
        {
          model: db.models.Restaurant,
          as: 'restaurant'
        },
        {
          model: db.models.Customer,
          as: 'customer'
        },
        {
          model: db.models.OrderItem,
          as: 'order_items',
          include: [
            {
              model: db.models.RestaurantMenu,
              as: 'restaurant_menu'
            }
          ]
        }
      ]
    })
    return order
  } catch (error) {
    throw error
  }
}
