import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

import resolvers from './resolvers'

const typeDefs = gql`
  type RestaurantMenu {
    id: ID!
    name: String!
    description: String
    price: Int!
    image: String!
    categories: [Category!]!
  }

  type Restaurant {
    id: ID!
    name: String!
    description: String!
    opening_time: String!
    closing_time: String!
    is_24_hours: String!
    phone_number: String!
    total_tables: String!
    menus: [RestaurantMenu!]!
    picture: String
    slug: String!
  }

  type RestaurantAdmin {
    id: ID!
    email: String!
    restaurant: Restaurant!
    nin: String!
    address: String!
    phone_number: String!
  }

  type Customer {
    id: ID!
    email: String!
    name: String!
    profile_picture: String
  }

  type OrderItem {
    id: ID!
    restaurant_menu: RestaurantMenu!
    quantity: Int!
    notes: String
  }

  type Order {
    id: ID!
    total_price: Int!
    table_number: Int
    restaurant: Restaurant!
    customer: Customer!
    order_items: [OrderItem!]!
    paid: Boolean!
    order_number: String!
  }

  type Category {
    id: Int!
    name: String!
  }

  input OrderItemInput {
    menu_id: ID!
    quantity: Int!
    note: String
  }

  type Query {
    'get all restaurants'
    allRestaurants: [Restaurant!]!

    'get restaurant by id or using restaurant admin token'
    restaurant(id: ID): Restaurant

    'get restaurant admin by id or using restaurant admin token'
    restaurantAdmin(id: ID): RestaurantAdmin

    'get all restaurant menu from a restaurant'
    allRestaurantMenus(restaurant_id: ID): [RestaurantMenu!]!

    'get single restaurant menu from a restaurant'
    restaurantMenu(id: ID!): RestaurantMenu

    'get all orders'
    allOrders: [Order!]!

    'get detailed order'
    order(id: ID!): Order

    'get customer by id or using customer token'
    customer(id: ID): Customer!

    'get all categories by restaurant id'
    allCategories(restaurant_id: ID): [Categories!]!
  }

  'mutation'
  type Mutation {
    'customer login'
    customerLogin(email: String!, password: String!): String!

    'customer registration'
    customerRegister(
      email: String!
      password: String!
      name: String!
    ): Customer!

    'restaurant admin login'
    restaurantAdminLogin(email: String!, password: String!): String!

    'restaurant verification for customer'
    verifyAndGetRestaurantToken(token: String!): OrderToken!

    'verify table'
    verifyTable(table_id: ID!): Boolean!

    'set items on order'
    updateOrder(items: [OrderItemInput!]!): Order!

    'mark order as paid (for restaurant admin)'
    markOrderAsPaid(order_id: ID!): Boolean!

    'add order item to order (for restaurant admin) (Returns ID of the orderItem)'
    addOrderItemToOrder(order_id: ID!, order_item: OrderItemInput!): ID!

    'remove order item to order (for restaurant admin)'
    removeOrderItemFromOrder(order_id: ID!, order_item_id: ID!): Boolean!

    'update order item to order (for restaurant admin)'
    updateOrderItemInOrder(
      order_id: ID!
      order_item_id: ID!
      order_item: OrderItemInput!
    ): Boolean!
  }
`

export default makeExecutableSchema({ typeDefs, resolvers })
