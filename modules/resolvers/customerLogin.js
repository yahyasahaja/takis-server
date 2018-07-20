import config from 'config')
import jwt from 'jsonwebtoken')
import bcrypt from 'bcrypt')
import db from '../../models')

export default async (obj, { email, password }) => {
  try {
    const customer = await db.models.Customer.findOne({ where: { email } })
    if (!await bcrypt.compare(password, customer.password)) {
      throw new Error('Invalid Email or Password')
    }
    const { secret_key: secretKey } = config.get('jwt')
    return jwt.sign(
      {
        scope: ['allRestaurants', 'restaurant', 'allOrders', 'order'],
        userId: customer.id,
        userType: 'Customer'
      },
      secretKey
    )
  } catch (err) {
    return err
  }
}
