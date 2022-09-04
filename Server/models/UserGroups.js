const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');


/**
 * 用户群表
 */
class UserGroups extends Model {

}

UserGroups.init({
    // (用户 UG_ID)
    UG_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // (群名称)
    UG_Name: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // (创建时间)
    UG_CreateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    // (群主 U_ID)
    UG_AdminID : {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // (群图标)
    UG_ICon: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // (群公告)
    UG_Notice: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    // (群简介)
    UG_Notice: {
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
    modelName: 'UserGroups', // 我们需要选择模型名称
    tableName: 'UserGroups'
});


module.exports = UserGroups;