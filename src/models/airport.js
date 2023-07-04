'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.city, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Airport.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        as: 'departureAirport',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Airport.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        as: 'arrivalAirport',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    address: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    cityId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};