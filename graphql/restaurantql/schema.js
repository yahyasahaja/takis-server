//MODULES
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

//SCHEMA
export default makeExecutableSchema({
  typeDefs,
  resolvers
})