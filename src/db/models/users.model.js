const {Model, DataTypes, Sequelize} = require('sequelize');
const {config} = require('../../config/config');

const USERS_TABLE = 'users'

const UsersSchema ={
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    sub: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    nickName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'nick_name',
    },
    fullName: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'full_name',
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    creationAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'creation_at',
        default: Sequelize.NOW
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_admin',
    },
    profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'profile_image',
    },
    strikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    countryIdId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'country_id_id',
    },
    genderIdId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'gender_id_id',
    }

}

class Users extends Model{

    static config(sequelize){
        return {
            sequelize,
            tableName: USERS_TABLE,
            schema: config.dbSchema,
            modelName: 'Users',
            timestamps: false
        }
    }

}

module.exports= {Users, UsersSchema, USERS_TABLE}