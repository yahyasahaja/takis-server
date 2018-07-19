//DATABASE
import db from '../../../../db'

//GENERATE VERIFICATION TOKEN FOR CUSTOMER
export default async (args, order_id) => {
  try {
    //get order
    let order = await db.models.Order.findOne({where: { id: order_id }})
    if (!order) throw new Error('No order with that id')
    
    //update order
    for (let i in args) order[i] = args[i]
    
    //save it
    let newOrder = await order.save()
    return newOrder
  } catch (e) {
    throw new Error(e.message || 'Internal server error')
  }
}