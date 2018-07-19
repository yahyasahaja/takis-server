//MODULES
import Express from 'express'
import GraphqlHTTP from 'express-graphql'
import jwt from 'jsonwebtoken'
// import path from 'path'
import cors from 'cors'
import compression from 'compression'

//SCHEMA_RESTAURANT
import restaurantSchema from './graphql/restaurantql/schema'

//SCHEMA_CUSTOMER
import customerSchema from './graphql/customerql/schema'

//EVENTS
import { DB_CONNECTED, events } from './events'

//DATABASE
require('./db')

//INNER_CONFIG
const PORT = 5000
const SECRET = 'iwiguhieuwghewgSansAppSansAja3528352'
let app = Express()

//CUSTOM_CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

//COMPRESSION
app.use(compression())

//VERIFY_USER
app.use(async req => {
  const token = req.headers.authorization

  if (token) {
    try {
      const data = await jwt.verify(token, SECRET)
      req.data = data
      console.log(data)
    } catch (err) {
      console.log(err)
    }
    
    req.next()
  } else req.next()
})

//GRAPHQL_RESTAURANT
app.use('/restaurantql', cors(), GraphqlHTTP(req => ({
  schema: restaurantSchema,
  pretty: true,
  graphiql: true,
  context: {
    SECRET,
    ...req.data
  }
})))

//GRAPHQL_CUSTOMER
app.use('/customerql', cors(), GraphqlHTTP(req => ({
  schema: customerSchema,
  pretty: true,
  graphiql: true,
  context: {
    SECRET,
    ...req.data
  }
})))

//START_SERVER 
//LISTEN TO PORT
events.on(DB_CONNECTED, () => {
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
})