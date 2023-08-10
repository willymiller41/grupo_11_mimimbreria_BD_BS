module.exports = (sequelize, dataTypes) => {
    let alias = 'Comments';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comment: {
            type: dataTypes.STRING,
            allowNull: false
        },
        published: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
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
        tableName: 'comments',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    };
    const Comment = sequelize.define(alias, cols, config);

    Comment.associate = function(models) {
        Comment.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id'
        });

        Comment.belongsTo(models.Products,{
            as: 'products',
            foreignKey: 'product_id'
        })
    };

    return Comment
}