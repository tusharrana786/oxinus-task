'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args : [2,100],
            msg: "Invalid first name"
          }
        },
      },
      last_name: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args : [2,100],
            msg: "Invalid last name"
          }
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.BIGINT,
        unique: true,
        validate: {
          len: {
            args : [2,100],
            msg: "Invalid phone number"
          }
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          len: [2,100],
        },
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(6)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(6)
      }
    }, {
      timestamps: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};