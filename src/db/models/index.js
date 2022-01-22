const {Discussion, DiscussionSchema} = require('../models/discussion.model');
const {Category, CategorySchema} = require('../models/category.model');
const {DiscussionStatus, DiscussionStatusSchema} = require('../models/discussionStatus.model');


function setupModels(sequelize){
    Discussion.init(DiscussionSchema, Discussion.config(sequelize))
    Category.init(CategorySchema, Category.config(sequelize))
    DiscussionStatus.init(DiscussionStatusSchema, DiscussionStatus.config(sequelize))

    Discussion.associate(sequelize.models)
    Category.associate(sequelize.models)
    DiscussionStatus.associate(sequelize.models)
    
    
}

module.exports = setupModels;