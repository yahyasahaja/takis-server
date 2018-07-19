//MODULES
// import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('OrderMenu', {
  
}, {
  underscored: true,
  timestamps: false,
}) 