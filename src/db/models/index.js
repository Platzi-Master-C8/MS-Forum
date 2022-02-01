const {Discussion, DiscussionSchema} = require('../models/discussion.model');
const {Category, CategorySchema} = require('../models/category.model');
const {DiscussionStatus, DiscussionStatusSchema} = require('../models/discussionStatus.model');
const { ContributionNodeType, ContributionNodeTypeSchema } = require('./contributionNodeType.model');
const { ContributionType, ContributionTypeSchema } = require('./contributionType.model');
const { Contribution, ContributionSchema } = require('./contributions.model');

const { DiscussionLikes, DiscussionLikesSchema } = require('./likes.model');



function setupModels(sequelize){
    Discussion.init(DiscussionSchema, Discussion.config(sequelize))
    Category.init(CategorySchema, Category.config(sequelize))
    DiscussionStatus.init(DiscussionStatusSchema, DiscussionStatus.config(sequelize))
    
    ContributionNodeType.init(ContributionNodeTypeSchema,ContributionNodeType.config(sequelize))
    ContributionType.init(ContributionTypeSchema,ContributionType.config(sequelize))
    Contribution.init(ContributionSchema,Contribution.config(sequelize))
    

    DiscussionLikes.init(DiscussionLikesSchema, DiscussionLikes.config(sequelize))


    Discussion.associate(sequelize.models)
    Category.associate(sequelize.models)
    DiscussionStatus.associate(sequelize.models)
   
    ContributionNodeType.associate(sequelize.models)
    ContributionType.associate(sequelize.models)
    Contribution.associate(sequelize.models)


    DiscussionLikes.associate(sequelize.models)

}

module.exports = setupModels;