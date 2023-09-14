'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      airplaneId: {
        // foreign key constraint
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Airplanes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      departureAirportId: {
        // foreign key constraint
        allowNull: false,
        references: {
          model: 'Airports',
          key: 'code'
        },
        type: Sequelize.STRING
      },
      arrivalAirportId: {
        // foreign key constraint
        allowNull: false,
        references: {
          model: 'Airports',
          key: 'code'
        },
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      arrivalTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      departureTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      boardingGate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalSeats: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};