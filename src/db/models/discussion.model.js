const {Model, DataTypes, Sequelize} = require('sequelize');
const {config} = require('../../config/config');
const {DISCUSSION_STATUS_TABLE} = require('./../models/discussionStatus.model');
const {CATEGORY_TABLE} = require('./../models/category.model');

const DISCUSSION_TABLE = 'netw_discussions'

const DiscussionSchema ={
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(140),
        allowNull: false,
        
            
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'category_id',
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
        default: Sequelize.NOW
    },
    modifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'modified_at'
    },
    modifiedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'modified_by'
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'status_id',
        default: 1,
        references: {
            model: DISCUSSION_STATUS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_active',
        default: true
    },
    discussionVersionNo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'discussion_version_no',
        default: 1
    }



}

class Discussion extends Model{
   
        static associate(models){
            this.belongsTo(models.Category, {as:'category'} )
            this.belongsTo(models.DiscussionStatus, {as:'status'} )
        }
    
        static config(sequelize){
            return {
                sequelize,
                tableName: DISCUSSION_TABLE,
                schema: config.dbSchema,
                modelName: 'Discussion',
                timestamps: false
            }
        }
    
    
}

module.exports= {Discussion, DiscussionSchema, DISCUSSION_TABLE}