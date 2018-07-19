//MODULES
import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('Customer', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
}) 