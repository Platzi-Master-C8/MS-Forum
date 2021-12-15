'use strict';
const { DiscussionSchema, DISCUSSION_TABLE } = require('./../models/discussion.model');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/category.model');
const { DiscussionStatusSchema, DISCUSSION_STATUS_TABLE } = require('./../models/discussionStatus.model');
const {config} = require('../../config/config');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema, {schema: config.dbSchema});
    await queryInterface.createTable(DISCUSSION_STATUS_TABLE, DiscussionStatusSchema, {schema: config.dbSchema});
    await queryInterface.createTable(DISCUSSION_TABLE, DiscussionSchema, {schema: config.dbSchema});
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_TABLE + ' ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CATEGORY_TABLE + ' ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_STATUS_TABLE + ' ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + CATEGORY_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_STATUS_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_TABLE + ' ALTER COLUMN discussion_version_no SET DEFAULT 1;');
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_TABLE + ' ALTER COLUMN status_id SET DEFAULT 1;');
    

    

  },

  async down (queryInterface) {
    await queryInterface.dropTable(DISCUSSION_TABLE, {schema: config.dbSchema});
    await queryInterface.dropTable(CATEGORY_TABLE, {schema: config.dbSchema});
    await queryInterface.dropTable(DISCUSSION_STATUS_TABLE, {schema: config.dbSchema});

  }
};
