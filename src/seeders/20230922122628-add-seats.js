'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{ 
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Seats', [
      {
        airplaneId: 23,
        row: 1,
        col: 'A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 23,
        row: 2,
        col: 'B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 24,
        row: 3,
        col: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 24,
        row: 4,
        col: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 24,
        row: 5,
        col: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 23,
        row: 6,
        col: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 25,
        row: 7,
        col: 'A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 23,
        row: 8,
        col: 'B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 24,
        row: 9,
        col: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 24,
        row: 10,
        col: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 23,
        row: 1,
        col: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 25,
        row: 2,
        col: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 23,
        row: 3,
        col: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 24,
        row: 4,
        col: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 25,
        row: 5,
        col: 'B',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
