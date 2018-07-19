//MODULES
import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('Invoice', {
  total_price: {
    type: Sequelize.INTEGER,
  },
}, {
  underscored: true,
})