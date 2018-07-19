//MODULES
import jwt from 'jsonwebtoken'
import db from '../../../../db'

//GENERATE VERIFICATION TOKEN FOR CUSTOMER
export default async (token, SECRET) => {
  try {
    //GET RESTAURANT ID
    let {
      restaurant_id
    } = await jwt.verify(token, SECRET)

    //RENEW VERIFICATION TOKEN FOR NEXT CUSTOMER
    let verification_token = await jwt.sign(
      {
        createdAt: Date.now(),
        random: Math.random(),
        restaurant_id
      },
      SECRET,
      {
        expiresIn: '1y'
      }
    )
    
    await db.models.Restaurant.update({
      verification_token
    }, {
      where: {
        id: restaurant_id
      }
    })

    //CREATE NEW ORDER
    let { id: order_id, valid_until } = await db.models.Order.create({
      valid_until: Date.now() + 720000000, //kurangi 0 sebanyak 1
      restaurant_id: restaurant_id
    })

    //GENERATE RESTAURANT VERIFICATION TOKEN
    let restaurantVerificationToken = await jwt.sign(
      {
        order_id,
        restaurant_id,
        valid_until
      },
      SECRET,
      {
        expiresIn: '2h'
      }
    )

    return {
      authtoken: restaurantVerificationToken
    }
  } catch (e) {
    throw new Error('Failed to generate token')
  }
}

//EXAMPLE RESULT
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmRlcl9pZCI6MSwiaWF0IjoxNTIzMTU1MjcyLCJleHAiOjE1MjMxNjI0NzJ9.QkNdJEA8s3uaiiPa8d_Kpoqk2fFZ6Y2nh4KAvkHg410