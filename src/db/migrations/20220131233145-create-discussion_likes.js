'use strict';
const {config} = require('../../config/config');
const {DISCUSSION_LIKES_TABLE, DiscussionLikesSchema} = require('../models/likes.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(DISCUSSION_LIKES_TABLE, DiscussionLikesSchema, {schema: config.dbSchema});
    
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_LIKES_TABLE + ' ALTER COLUMN liked_at SET DEFAULT CURRENT_TIMESTAMP;');
   
    await queryInterface.sequelize.query('ALTER TABLE IF EXISTS ' + config.dbSchema + '.' + DISCUSSION_LIKES_TABLE + ' ALTER COLUMN is_active SET DEFAULT true;');
    
  },

  async down (queryInterface) {
    await queryInterface.dropTable(DISCUSSION_LIKES_TABLE, {schema: config.dbSchema});
    
  }
};
