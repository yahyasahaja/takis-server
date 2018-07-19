//DATABASE
import db from '../../../../db'

//GENERATE VERIFICATION TOKEN FOR CUSTOMER
export default async (id, order_id) => {
  try {
    let order = await db.models.Order.findOne({where: { id: order_id }})
    if (!order) throw new Error('No order with that id')

    let restaurant = await order.getRestaurant()
    if (!restaurant) throw new Error('No restaurant with that id')
    
    let table = await restaurant.getRestaurantTables({where: {id: 1}})
    
    order.table_id = table.id
    await order.save()

    return !!table
  } catch (e) {
    throw new Error(e.message || 'Internal server error')
  }
}