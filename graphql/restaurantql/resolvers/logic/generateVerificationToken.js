//MODULES
import jwt from 'jsonwebtoken'
import db from '../../../../db'

//GENERATE VERIFICATION TOKEN FOR CUSTOMER
export default async (restaurant_id, SECRET) => {
  try {
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
    
    return {
      authtoken: verification_token
    }
  } catch (e) {
    throw new Error('Failed to generate token')
  }
}

//Login Token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNTIzMTU0NTA5LCJleHAiOjE1NTQ3MTIxMDl9.xOdtqPyNmOlf3goO8ybjrKK_oOyC6Ih7XOhqVAjKHeY

