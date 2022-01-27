'use strict';

const { config } = require("../../config/config");
const { CONTRIBUTION_NODE_TYPES_TABLE } = require("../models/contributionNodeType.model");
const seed_data = require("./../data/seed_data");
module.exports = {
  async up (queryInterface, ) {
    await queryInterface.bulkInsert({tableName:CONTRIBUTION_NODE_TYPES_TABLE, schema: config.dbSchema}, 
      seed_data.contribution_node_types, {schema: config.dbSchema})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete({tableName:CONTRIBUTION_NODE_TYPES_TABLE, schema: config.dbSchema}, 
      null, {schema: config.dbSchema})
  }
};
