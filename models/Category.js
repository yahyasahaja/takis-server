//MODULES
import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('Category', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
  }
}, {
  underscored: true,
  timestamps: false,
}) 