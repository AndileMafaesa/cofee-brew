const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Brew = sequelize.define('Brew', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  beans: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Beans field is required' },
    },
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Method field is required' },
    },
  },
  coffeeGrams: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Coffee grams is required' },
      min: { args: [0.1], msg: 'Coffee grams must be greater than 0' },
    },
  },
  waterGrams: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Water grams is required' },
      min: { args: [0.1], msg: 'Water grams must be greater than 0' },
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notNull: { msg: 'Rating is required' },
      min: { args: [0], msg: 'Rating must be at least 0' },
      max: { args: [5], msg: 'Rating must be at most 5' },
    },
  },
  tastingNotes: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Tasting notes are required' },
    },
  },
}, {
  tableName: 'brews',
  timestamps: true,
});

module.exports = Brew;
