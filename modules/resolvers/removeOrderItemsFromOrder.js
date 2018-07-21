import db from '../../models'
import { JWT } from '../../config'
import jwt from 'jsonwebtoken'

export default async (obj, { token, order_item_ids }, { scope }) => {
  if (token) scope = jwt.verify(token, JWT.SECRET_KEY).scope
  
  if (!scope.includes('removeOrderItemsFromOrder')) {
    throw new Error('Permission Denied')
  }

  try {
    const order = await db.models.Order.findById({where: { token }})
    
    if (order === null) {
      throw new Error('Invalid Order ID')
    }

    return await db.models.OrderItem.destroy({
      where: { id: order_item_ids }
    })
  } catch (error) {
    throw error
  }
}
