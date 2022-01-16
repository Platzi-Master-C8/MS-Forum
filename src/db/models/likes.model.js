const { Model, DataTypes, Sequelize } = require('sequelize');

const LIKES_TABLE = 'discussion_likes';

const LikesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
    },
    likedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'liked_at'
    },
    discussionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'discussion_id'
    },
    likedBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'liked_by'
    }
}

class Likes extends Model{
    static associate() {
        //associate
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: LIKES_TABLE,
            modelName: 'Likes',
            timestamps: false
        }
    }
}

module.exports = { LIKES_TABLE, LikesSchema, Likes }