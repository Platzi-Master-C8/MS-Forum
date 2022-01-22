const {Model, DataTypes, Sequelize} = require('sequelize');
const {config} = require('../../config/config');
const CATEGORY_TABLE = 'netw_categories'

const CategorySchema ={
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
        allowNull: false,
        field: 'created_at',
        default: Sequelize.NOW
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default:true,
        field: 'is_active'
        
    }
    

}

class Category extends Model{
    static associate(models){
        this.hasMany(models.Discussion, { as: 'discussions',
        foreignKey: 'id'})
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            schema: config.dbSchema,
            modelName: 'Category',
            timestamps: false
        }
    }

}

module.exports= {Category, CategorySchema, CATEGORY_TABLE}