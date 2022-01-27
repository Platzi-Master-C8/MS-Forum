'use strict';

const { CONTRIBUTION_TYPES_TABLE } = require("../models/contributionType.model");
const seed_data = require("./../data/seed_data");
const {config} = require("../../config/config");
module.exports = {
  async up (queryInterface ) {
    await queryInterface.bulkInsert({tableName:CONTRIBUTION_TYPES_TABLE, schema: config.dbSchema}, 
      seed_data.contribution_types, {schema: config.dbSchema})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete({tableName:CONTRIBUTION_TYPES_TABLE, schema: config.dbSchema}, 
      null, {schema: config.dbSchema})
  }
};
