const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');

/**
 * 好友分组表
 */
class Fridendship extends Model {

}

Fridendship.init({
    // (主键ID)
    F_ID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // (外键 ——— 用户uid)
    F_UserID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // (外键 ——— 好友uid)
    F_FirendID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // (备注昵称)
    F_Name: {
        type: DataTypes.STRING(30)
    },
    // (外键 ——— 所属分组)
    F_FriendGroupsID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // (逻辑上的删除)
    IsDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'fridendship' // 我们需要选择模型名称
});

module.exports = Fridendship;