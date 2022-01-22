'use strict';
const seed_data = require('./../data/seed_data');
const {CATEGORY_TABLE} = require('./../models/category.model');
const {config } = require('../../config/config');
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert({tableName:CATEGORY_TABLE, schema: config.dbSchema},
      seed_data.categories, 
      {schema: config.dbSchema})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete({tableName:CATEGORY_TABLE, schema: config.dbSchema},
      null, 
      {schema: config.dbSchema})
  }
};
