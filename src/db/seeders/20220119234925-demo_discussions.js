'use strict';
const seed_data = require('./../data/seed_data');
const { DISCUSSION_TABLE } = require('./../models/discussion.model');
const { config } = require('../../config/config');
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert({tableName:DISCUSSION_TABLE, schema: config.dbSchema}, 
      seed_data.demo_discussions, {schema: config.dbSchema})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete({tableName:DISCUSSION_TABLE, schema: config.dbSchema},
       null, 
       {schema: config.dbSchema})
  }
};
