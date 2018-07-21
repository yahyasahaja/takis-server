import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Customer',
  {
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    profile_picture: {
      type: Sequelize.STRING(128),
      allowNull: true
    },
    verification_token: {
      type: Sequelize.STRING,
    },
    is_verified: {
      type: Sequelize.VIRTUAL,
      get: async function() {
        return !!this.verification_token
      }
    }
  },
  {
    underscored: true,
    timestamps: false
  }
)
