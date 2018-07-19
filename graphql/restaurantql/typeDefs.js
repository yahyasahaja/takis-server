//MODULES
import gql from 'graphql-tag'

export default gql`
  "images"
  type Img {
    id: ID!
    url: String!
    name: String
  }
  
  "token for authentication"
  type Token {
    authtoken: String!
  }
  
  "restaurant"
  type Restaurant {
    id: ID!
    email: String!
    name: String!
    password: String!
    menu: [RestaurantMenu!]
    profpic: Img
    verification_token: Token
  }

  "restaurant menu"
  type RestaurantMenu {
    id: ID!
    name: String
    description: String
    price: Int
    img: Img
    restaurant: Restaurant
    categories: [Category]
  }

  "category"
  type Category {
    id: ID!
    name: String
  }

  "messages"
  type Message {
    message: String!
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
    total_price: Int
    table_id: Int
    valid_until: String
    valid: Boolean
    order_number: String
    restaurant: Restaurant
    customer: Customer
    restaurant_menus: [RestaurantMenu]
    paid: Boolean
  }

  "restaurant menu input"
  input RestaurantMenuInput {
    id: Int
  }
  
  type Query {
    "get restaurant"
    me: Restaurant

    "get restaurant menu"
    RestaurantMenu: [RestaurantMenu]
  }

  type Mutation {
    "restaurant login"
    login(email: String!, password: String!): Token

    "restaurant register"
    register(
      email: String!, 
      password: String!, 
      name: String!,
    ): Token

    "restaurant verification for customer"
    verifyAndGetRestaurantToken(token: String!): Token

    "restaurant table verification for customer"
    verifyTableId(table_id: ID!): Boolean

    "generate restaurant verification token"
    generateVerificationToken: Token
    
    "update order"
    updateOrder(
      total_price: Int,
      table_id: Int,
      valid_until: String,
      valid: Boolean,
      order_number: String,
      restaurant_menus: [RestaurantMenuInput]
    ): Order

    "checkout and get order_id"
    checkout(
      restaurant_menus: [RestaurantMenuInput!]
    ): Int

    pay(
      order_id: Int!
    ): Boolean
  }
`