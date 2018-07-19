//MODULES
import Sequelize from 'sequelize'
import connection from '../connection'

//USER_SCHEMA
export default connection.define('Image', {
  name: {
    type: Sequelize.STRING(64),
  },
  url: {
    type: Sequelize.STRING,
  },
  // num_of_employee: {
  //   type: Sequelize.VIRTUAL,
  //   get: async function() {
  //     return await connection.models.Employee.count({where:{dept_id: this.id}}) 
  //   }
  // }
}, {
  underscored: true,
  timestamps: false,
}) 