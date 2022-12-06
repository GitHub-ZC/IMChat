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
    // (加好友方式来源)  帐号查找
    F_Source: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    // 加好友时的附加消息
    F_AdditionalMessage: {
        type: DataTypes.STRING(150),
        defaultValue: '对方没有留下附加消息'
    },
    // 是否 被 同意添加好友
    F_IsAgree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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