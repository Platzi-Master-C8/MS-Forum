const { Model, DataTypes, Sequelize } = require('sequelize');
const { config } = require('../../config/config');
const { DISCUSSION_TABLE } = require('./../models/discussion.model');

const DISCUSSION_LIKES_TABLE = 'netw_discussion_likes';

const DiscussionLikesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    isActive: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        field: 'is_active',
        default: true
    },
    likedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'liked_at',
        default: Sequelize.NOW
    },
    discussionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'discussion_id',
        references: {
            model: DISCUSSION_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_Id'
    }
}

class DiscussionLikes extends Model{
    static associate(models) {
        this.belongsTo(models.Discussion, {as:'discussion'})
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DISCUSSION_LIKES_TABLE,
            schema:config.dbSchema,
            modelName: 'DiscussionLikes',
            timestamps: false
        }
    }
}

module.exports = { DISCUSSION_LIKES_TABLE, DiscussionLikesSchema, DiscussionLikes }