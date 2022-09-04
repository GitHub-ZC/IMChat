const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');




/**
 * 群用户关联表
 */
class UserGroupsToUser extends Model {

}

UserGroupsToUser.init({
    // (UG_ID)
    UG_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // (外键 ———— 用户ID)
    UG_UserID: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // (外键 ———— 群ID)
    UG_GroupID: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    // (发送时间)
    UG_CreateTime : {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // (群内用户昵称)
    UG_GroupNick : {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // 逻辑上的删除
    isdelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'UserGroupsToUser', // 我们需要选择模型名称
    tableName: 'UserGroupsToUser'
});


module.exports = UserGroupsToUser;