import db from '../../models')
export default async (obj, args, context) => {
  if (!context.scope.includes('currentOrder')) {
    throw new Error('Permission Denied')
  }

  try {
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
    if (order === null) {
      throw new Error('Invalid Token. Order cannot be found')
    }
    return order
  } catch (error) {
    throw error
  }
}
