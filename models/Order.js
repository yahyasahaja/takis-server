//MODULES
import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('Order', {
  total_price: {
    type: Sequelize.INTEGER,
  },
  table_id: {
    type: Sequelize.INTEGER,
  },
  valid_until: {
    type: Sequelize.DATE,
  },
  valid: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return Date.now() > this.valid_until
    }
  },
  paid: {
    type: Sequelize.VIRTUAL,
    get: async function() {
      return !!(connection.models.Invoice.findOne({where: {id: this.invoice_id}}))
    }
  },
  order_number: {
    type: Sequelize.VIRTUAL,
    get: async function() {
      return `${
        ( 
          await connection
            .models
            .Restaurant
            .findOne({where: {restaurant_id: this.restaurant_id}})
        )
          .split('')
          .slice(0, 2)
          .map(d => d[0])
          .join('')
      }${this.id}`
    }
  },
}, {
  underscored: true,
})