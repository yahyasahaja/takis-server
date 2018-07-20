//MODULES
import Express from 'express'
import graphqlExpress from 'express-graphql'
import jwt from 'jsonwebtoken'
// import path from 'path'
import cors from 'cors'
import compression from 'compression'

//SCHEMA_RESTAURANT
import schema from './modules/schema'

//EVENTS
import { DB_CONNECTED, events } from './events'

//DATABASE
import db from './models'

//CONFIG
import { JWT } from './config'

//INNER_CONFIG
const PORT = 5000
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

//AUTH
async function authMiddleware(req, res, next) {
  // pre define context scope
  req.state = { scope: [] }

  try {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (authHeader.length > 0) {
      const [scheme, token] = authHeader.split(' ')

      if (!/^Bearer$/i.test(scheme)) {
        res.status(401).json({
          error: 'Bad token format'
        })
      }

      const dtoken = jwt.verify(token, JWT.SECRET_KEY)
      
      req.state = { ...req.state, ...dtoken }

      if (dtoken.userType === 'Resto')
        req.state.user = await db.models.RestaurantAdmin.findById(dtoken.userId)
      else if (dtoken.userType === 'Customer')
        req.state.user = await db.models.Customer.findById(dtoken.userId)
      else
        req.state.user = {
          id: 0,
          name: 'Guest',
          email: ''
        }
    }

    await next()
  } catch (err) {
    res.status(401).json({
      error: err.message
    })
  }
}

//GRAPHQL
app.use(
  '/graphql',
  authMiddleware(),
  cors(),
  graphqlExpress(req => ({
    schema,
    pretty: true,
    graphiql: true,
    context: {
      JWT_SECRET_KEY: JWT.SECRET_KEY,
      ...req.state
    }
  }))
)

//START_SERVER 
//LISTEN TO PORT
events.on(DB_CONNECTED, () => {
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
})