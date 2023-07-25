module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        code:{
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    };
    const User = sequelize.define(alias, cols, config);
    User.associate = function(models) {
        User.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'role_id'
        });
    }

    return User
}