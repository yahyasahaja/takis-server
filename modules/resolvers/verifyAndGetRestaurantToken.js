import config from 'config')
import jwt from 'jsonwebtoken')
import uuidv4 from 'uuid/v4')
import db from '../../models')

export default async (obj, args) => {
  try {
    const { secret_key: secretKey } = config.get('jwt')

    const restaurant = await db.models.Restaurant.findOne({
      where: {
        verification_token: args.token
      }
    })
    if (restaurant === null) {
      throw new Error('Invalid Token')
    }
    let newRestoToken, isTokenUsed
    do {
      newRestoToken = uuidv4()
      isTokenUsed =
        (await db.models.Restaurant.count({
          where: {
            verification_token: newRestoToken
          }
        })) > 0
    } while (isTokenUsed)

    await db.models.Restaurant.update(
      {
        verification_token: newRestoToken
      },
      {
        where: {
          id: restaurant.id
        }
      }
    )

    const order = await db.models.Order.create({
      valid_until: Date.now() + 7200000, // equals 2h in ms
      restaurant_id: restaurant.id
    })

    const { id: orderId, valid_until } = order
    // TODO:
    // 1. Detect if the one who is doing this is a customer.
    const token = await jwt.sign(
      {
        order_id: orderId,
        restaurant_id: restaurant.id,
        valid_until,
        scope: [
          'restaurant',
          'verifyTable',
          'currentRestaurant',
          'currentOrder',
          'updateOrder',
          'allRestaurantMenus',
          'allCategories'
        ],
        userType: 'Guest',
        userId: 0
      },
      secretKey,
      {
        expiresIn: '2h'
      }
    )
    return {
      token,
      order
    }
  } catch (error) {
    throw error
  }
}
