import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Pay',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    underscored: true,
    timestamps: false
  }
)
