module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category: {
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
        tableName: 'categories',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'category_id'
        });
    };

    return Category
}