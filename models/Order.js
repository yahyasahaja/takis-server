import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Order',
  {
    total_price: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    table_number: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    order_number: {
      type: Sequelize.VIRTUAL,
      get: async function() {
        try {
          const resto = await connection.models.Restaurant.findOne({
            where: { id: this.restaurant_id }
          })
          return `${resto.name.substr(0, 2).toUpperCase()}${this.id}`
        } catch (err) {
          return err
        }
      }
    }
  },
  {
    underscored: true,
    timestamps: false
  }
)
