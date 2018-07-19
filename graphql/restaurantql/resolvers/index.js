//DATABASE
import db from '../../../db'

//AUTH_CHECKING
import { requiresRestoAuth, requiresVerifAuth } from '../../../services/auth'

//LOGIC
import generateVerificationToken from './logic/generateVerificationToken'
import verifyAndGetRestaurantToken from './logic/verifyAndGetRestaurantToken'
import verifyTableId from './logic/verifyTableId'
import updateOrder from './logic/updateOrder'
import login from './logic/login'
import checkout from './logic/checkout'

//TYPES
import types from './types'

//RESOLVERS
export const resolvers = {
  Query: {
    me: requiresRestoAuth.createResolver(
      async (_, args, { restaurant_id }) => await db.models.Restaurant.findOne({
        where: {
          id: restaurant_id
        }
      })
    ),
    RestaurantMenu: requiresVerifAuth.createResolver(
      async (_, args, { restaurant_id }) => (
        await (await db.models.Restaurant.findOne({
          where: {
            id: restaurant_id
          }
        })).getRestaurantMenus()
      )
    )
  },
  Mutation: {
    generateVerificationToken: requiresRestoAuth.createResolver(
      (_, args, { restaurant_id, SECRET }) => generateVerificationToken(restaurant_id, SECRET)
    ),
    verifyAndGetRestaurantToken: (
      (_, { token }, { SECRET }) => verifyAndGetRestaurantToken(token, SECRET)
    ),
    verifyTableId: requiresVerifAuth.createResolver(
      (_, { table_id }, { order_id }) => verifyTableId(table_id, order_id)
    ),
    updateOrder: requiresVerifAuth.createResolver(
      (_, args, { order_id }) => updateOrder(args, order_id)
    ),
    login: (_, { email, password }, { SECRET }) => login(email, password, SECRET),
    checkout: (_, { restaurant_menus }, { order_id }) => checkout(restaurant_menus, order_id)
  },
  ...types
}

export default resolvers