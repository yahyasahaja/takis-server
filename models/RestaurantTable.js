//MODULES
import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('RestaurantTable', {
  name: {
    type: Sequelize.STRING,
  }
}, {
  underscored: true,
  timestamps: false,
}) 