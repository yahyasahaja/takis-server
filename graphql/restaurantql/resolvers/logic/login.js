//DATABASE
import db from '../../../../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//GENERATE VERIFICATION TOKEN FOR CUSTOMER
export default async (email, password, SECRET) => {
  try {
    let restaurant = await db.models.Restaurant.findOne({ where: { email }})
    if (!restaurant) throw new Error('No user with that email')

    const valid = bcrypt.compare(password, restaurant.password)
    if (!valid) throw new Error('Incorrect password')

    const authtoken = jwt.sign(
      {
        restaurant_id: restaurant.id
      },
      SECRET,
      {
        expiresIn: '1y'
      }
    )

    return {
      authtoken
    }
  } catch (e) {
    throw new Error(e.message || 'Internal server error')
  }
}