import bcrypt from 'bcrypt'
import db from '../../models'
import jwt from 'jsonwebtoken'
import { JWT, USER_TYPE } from '../../config'

export default async (obj, { email, password, name }) => {
  try {
    const duplicatedUser = await db.models.Customer.findOne({
      where: {
        email
      }
    })

    if (duplicatedUser) throw new Error('User with same email already exist')

    const user = await db.models.Customer.create({
      email,
      name,
      password: await bcrypt.hash(password, 12)
    })

    let token = jwt.sign(
      {
        scope: [
          'allRestaurants', 
          'restaurant', 
          'allOrders', 
          'order'
        ],
        userId: user.id,
        userType: USER_TYPE.CUSTOMER
      },
      JWT.SECRET_KEY
    )

    return token
  } catch (err) {
    return err
  }
}
