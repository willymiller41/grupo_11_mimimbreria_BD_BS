module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER
        },
        stock: {
            type: dataTypes.INTEGER
        },
        order:{
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
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
        tableName: 'products',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    };
    const Product = sequelize.define(alias, cols, config)
    
    Product.associate = function(models) {
        Product.belongsTo(models.Categories, {
            as: 'categories',
            foreignKey: 'category_id'
        });
    };
    
    return Product
}