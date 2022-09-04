const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');

/**
 *  离线用户key为空

    数据结构：key-value

    取值：
    1=在线
    2=离开
    3=隐身（VIP功能）
 */

class UsersOnline extends Model {

}

UsersOnline.init({
    // (用户 U_ID)
    U_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    // (用户的在线状态)
    U_Status: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'UsersOnline', // 我们需要选择模型名称
    tableName: 'UsersOnline'
});


module.exports = UsersOnline;