import config from 'config')
import jwt from 'jsonwebtoken')
import bcrypt from 'bcrypt')
import db from '../../models')

export default async (obj, { email, password }) => {
  try {
    const restoAdmin = await db.models.RestaurantAdmin.findOne({
      where: { email }
    })
    if (restoAdmin === null) {
      throw new Error('Invalid Email or Password')
    }
    if (!await bcrypt.compare(password, restoAdmin.password)) {
      throw new Error('Invalid Email or Password')
    }
    const { secret_key: secretKey } = config.get('jwt')
    return jwt.sign(
      {
        scope: [
          'allRestaurants',
          'restaurant',
          'allRestaurantMenus',
          'restaurantMenu',
          'allOrders',
          'order',
          'markOrderAsPaid',
          'addOrderItemToOrder',
          'removeOrderItemFromOrder',
          'updateOrderItemInOrder',
          'currentRestaurantAdmin',
          'allCategories'
        ],
        userId: restoAdmin.id,
        userType: 'Resto'
      },
      secretKey
    )
  } catch (err) {
    return err
  }
}
