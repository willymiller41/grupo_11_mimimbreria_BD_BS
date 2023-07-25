module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role: {
            type: dataTypes.STRING,
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
        tableName: 'roles',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    };
    const Role = sequelize.define(alias, cols, config);

    Role.associate = (models) => {
        Role.hasMany(models.Users, {
            as: 'users',
            foreignKey: 'role_id',
        })
    }
    return Role
}