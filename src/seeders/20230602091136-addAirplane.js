'use strict';
const {Op} = require("sequelize");
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
    await queryInterface.bulkInsert('Airplanes', [
      {
      modelNumber: "airbus345",
      capacity: 322,
      updatedAt: new Date(),
      createdAt: new Date()
     },
     {
      modelNumber: "boeing34",
      capacity: 233,
      updatedAt: new Date(),
      createdAt: new Date()
     },
     {
      modelNumber: "oka34",
      capacity: 344,
      updatedAt: new Date(),
      createdAt: new Date()
     },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {
      [Op.or] : [
        {modelNumber : "airbus345"},
        {modelNumber : "boeing34"}
      ]
    });

  }
};
