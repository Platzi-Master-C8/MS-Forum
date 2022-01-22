'use strict';
const seed_data = require('./../data/seed_data');
const {DISCUSSION_STATUS_TABLE} = require('./../models/discussionStatus.model');
const {config} = require('../../config/config');
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert({tableName:DISCUSSION_STATUS_TABLE, schema: config.dbSchema}, 
      seed_data.discussion_statuses,
      {schema: config.dbSchema})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete({tableName:DISCUSSION_STATUS_TABLE, schema: config.dbSchema}, 
      null,
      {schema: config.dbSchema})
  }
};
