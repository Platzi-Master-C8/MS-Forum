'use strict';
const {config} = require('../../config/config');
const { CONTRIBUTION_TABLE, ContributionSchema } = require('../models/contributions.model');
const { CONTRIBUTION_NODE_TYPES_TABLE, ContributionNodeTypeSchema } = require("../models/contributionNodeType.model");
const { CONTRIBUTION_TYPES_TABLE, ContributionTypeSchema } = require('../models/contributionType.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CONTRIBUTION_NODE_TYPES_TABLE, ContributionNodeTypeSchema, {schema: config.dbSchema});
    await queryInterface.createTable(CONTRIBUTION_TYPES_TABLE, ContributionTypeSchema, {schema: config.dbSchema});
    await queryInterface.createTable(CONTRIBUTION_TABLE, ContributionSchema, {schema: config.dbSchema});
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_TABLE + ' ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_TABLE + ' ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_NODE_TYPES_TABLE + ' ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_NODE_TYPES_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CONTRIBUTION_TABLE + ' ALTER COLUMN contribution_node_type_id SET DEFAULT 1;');
    
    
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CONTRIBUTION_NODE_TYPES_TABLE, {schema: config.dbSchema});
    await queryInterface.dropTable(CONTRIBUTION_TYPES_TABLE,  {schema: config.dbSchema});
    await queryInterface.dropTable(CONTRIBUTION_TABLE,  {schema: config.dbSchema});
  }
};
