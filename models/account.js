'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id: undefined, password: undefined}
    }
  }
  account.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args : [2,100],
          msg: "Invalid first name"
        }
      },
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args : [2,100],
          msg: "Invalid last name"
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Not an email",
        },
        len: {
          args : [2,50],
          msg: "Invalid email"
        }
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      unique: true,
      validate: {
        len: {
          args : [2,100],
          msg: "Invalid phone number"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    birthday: {
      type:DataTypes.DATEONLY,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE(6)
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE(6)
    }

  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};