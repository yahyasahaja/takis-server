import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'RestaurantAdmin',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    underscored: true,
    timestamps: false
  }
)
