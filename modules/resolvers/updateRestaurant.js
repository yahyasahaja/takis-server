// import db from '../../models'

export default async (obj, { input }, { scope, user }) => {
  if (scope.includes('updateRestaurantAdmin')) {
    try {
      for (let key in input) user[key] = input[key]

      return await user.save()
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
