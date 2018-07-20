import db from '../../models'

export default async (obj, { id }, context) => {
  if (context.scope.includes('order')) {
    try {
      return await db.models.Order.findById(id)
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
