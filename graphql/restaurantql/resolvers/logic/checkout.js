//DATABASE
import db from '../../../../db'

//GENERATE VERIFICATION TOKEN FOR CUSTOMER
export default async (restaurant_menus, order_id) => {
  try {
    let order = await db.models.Order.findOne({where: { id: order_id }})
    if (!order) throw new Error(`No order with id ${order_id}`)

    if (order.paid) return -1
    
    // for (let i in order) if (i.includes('set')) console.log(i)

    let restaurant = await order.getRestaurant()
    if (!restaurant) throw new Error('No restaurant with that id')
    // console.log('TO BE CHECKED OUT', restaurant_menus.map(d => d.id))
    let restaurantMenu = await restaurant.getRestaurantMenus({where: {
      id: { $in: restaurant_menus.map(d => d.id) }
    }})
    
    let total_price = restaurantMenu.reduce((prev, cur) => prev + cur.price, 0)
    // for (let i in order) if (i.includes('Invoice')) console.log(i)
    await order.setRestaurantMenus(restaurantMenu)
    await order.createInvoice({
      total_price
    })
    // await order.save()

    return order_id
  } catch (e) {
    console.log(e.message)
    throw new Error(e.message || 'Internal server error')
  }
}