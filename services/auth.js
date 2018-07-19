import db from '../db'

const createResolver = (resolver) => {
  const baseResolver = resolver
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context) => {
      await resolver(parent, args, context)
      return childResolver(parent, args, context)
    }
    return createResolver(newResolver)
  }
  return baseResolver
}

export const requiresVerifAuth = createResolver(async (parent, args, context) => {
  if (!context.order_id || Date.now() > new Date(context.valid_until)) {
    throw new Error('Not authenticated (Resto Verify Auth)')
  }
})

export const requiresRestoAuth = createResolver((parent, args, context) => {
  if (!context.restaurant_id) {
    throw new Error('Not Authenticated (Resto Auth)')
  }
})

export default {
  requiresRestoAuth,
  requiresVerifAuth,
}