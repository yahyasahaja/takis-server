//MODULES
import gql from 'graphql-tag'

export default gql`
  "token for authentication"
  type Token {
    authtoken: String!
  }

  "image"
  type Img {
    url: String!
    name: String
  }

  "customer"
  type Customer {
    id: ID!
    email: String
    password: String
    name: String
    profpic: Img
  }

  "order"
  type Order {
    id: ID!
    total: Int!
    table_id: Int
    valid_until: String
    valid: Boolean
    order_number: String
    restaurant: Restaurant
    customer: Customer
  }

  "restaurant"
  type Restaurant {
    id: ID!
    email: String!
    name: String!
    password: String!
    menu: [RestaurantMenu!]
    profpic: Img
    verificationToken: Token
  }

  "restaurant menu"
  type RestaurantMenu {
    id: ID!
    name: String
    description: String
    price: Int
    img: Img
    restaurant: Restaurant
  }

  "message"
  type Message {
    message: String!
  }
  
  type Query {
    "get customer"
    me: Customer
  }

  type Mutation {
    "customer login"
    login(email: String!, password: String!): Token
    
    "customer registration"
    register(
      email: String!, 
      password: String!, 
      name: String!,
    ): Token
  }
`