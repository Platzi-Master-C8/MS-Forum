const {Model, DataTypes, Sequelize} = require('sequelize');
const {config} = require('../../config/config');
const DISCUSSION_STATUS_TABLE = 'netw_discussion_status'

const DiscussionStatusSchema ={
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
        
            
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

class DiscussionStatus extends Model{
    static associate(models){
        this.hasMany(models.Discussion, {as:'discussions',
        foreignKey: 'id'})
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: DISCUSSION_STATUS_TABLE,
            schema: config.dbSchema,
            modelName: 'DiscussionStatus',
            timestamps: false
        }
    }
}
module.exports= {DiscussionStatusSchema, DISCUSSION_STATUS_TABLE, DiscussionStatus}