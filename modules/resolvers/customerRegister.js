import bcrypt from 'bcrypt')
import db from '../../models')

export default async (obj, { email, password, name }) => {
  try {
    const duplicatedUser = await db.models.Customer.findOne({
      where: {
        email
      }
    })
    if (duplicatedUser !== null) {
      throw new Error('User with same email already exist')
    }
    const user = await db.models.Customer.create({
      email,
      name,
      password: await bcrypt.hash(password, 12)
    })
    return user
  } catch (err) {
    return err
  }
}
