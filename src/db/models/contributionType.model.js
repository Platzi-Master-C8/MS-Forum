const {Model, DataTypes, Sequelize} = require('sequelize');
const {config} = require('../../config/config');
const CONTRIBUTION_TYPES_TABLE = 'netw_contribution_types'

const ContributionTypeSchema ={
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

class ContributionType extends Model{
    static associate(models){
        this.hasMany(models.Contribution, {as:'contributions',
        foreignKey: 'id'})
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: CONTRIBUTION_TYPES_TABLE,
            schema: config.dbSchema,
            modelName: 'ContributionType',
            timestamps: false
        }
    }
}
module.exports= {ContributionTypeSchema, CONTRIBUTION_TYPES_TABLE, ContributionType}