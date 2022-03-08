const {Model, DataTypes, Sequelize} = require('sequelize');
const {config} = require('../../config/config');
const {DISCUSSION_TABLE} = require('./../models/discussion.model');
const {CONTRIBUTION_NODE_TYPES_TABLE} = require('./../models/contributionNodeType.model');
const {USERS_TABLE } = require('./../models/users.model');

const {CONTRIBUTION_TYPES_TABLE} = require('./../models/contributionType.model');

const CONTRIBUTION_TABLE = 'netw_contributions'

const ContributionSchema ={
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
   
    
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
            model: USERS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    contributionNodeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        field: 'contribution_node_type_id',
        references: {
            model: CONTRIBUTION_NODE_TYPES_TABLE,
            key: 'id'
        },
        default:1,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    contributionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'contribution_type_id',
        references: {
            model: CONTRIBUTION_TYPES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
        default: Sequelize.NOW
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_active',
        default: true
    }
    



}

class Contribution extends Model{
   
        static associate(models){
            this.belongsTo(models.ContributionType, {as:'contributionType'})
            this.belongsTo(models.ContributionNodeType, {as:'contributionNodeType'})
            this.belongsTo(models.Discussion, {as:'discussion'})
            this.belongsTo(models.Users, {as:'users', foreignKey: 'user_id'} )
            
        }
    
        static config(sequelize){
            return {
                sequelize,
                tableName: CONTRIBUTION_TABLE,
                schema: config.dbSchema,
                modelName: 'Contribution',
                timestamps: false
            }
        }
    
    
}

module.exports= {Contribution, ContributionSchema, CONTRIBUTION_TABLE}