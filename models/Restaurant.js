import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Restaurant',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
    },
    opening_time: {
      type: Sequelize.DATE,
    },
    closing_time: {
      type: Sequelize.DATE,
    },
    is_24_hours: {
      type: Sequelize.BOOLEAN,
    },
    phone_number: {
      type: Sequelize.NUMBER,
    },
    picture: {
      type: Sequelize.STRING,
    },
    total_table: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    underscored: true,
    timestamps: false
  }
)
