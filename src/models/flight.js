'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: "airplane",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        targetKey: "code",
        as: 'departureAirport',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        targetKey: "code",
        as: 'arrivalAirport',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      // foreign key constraint associations
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId:{
      // foreign key constraint associations
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalAirportId: {
      // foreign key constraint associations
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalSeats: { // total remaining seats
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};