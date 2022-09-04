const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');


class FriendGroups extends Model {

}

FriendGroups.init({
    // (主键FG_ID)
    FG_ID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // (外键 ——— 用户uid)
    FD_UserID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // (分组名字) 
    FG_Name: {
        type: DataTypes.STRING(30)
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'FriendGroups', // 我们需要选择模型名称
    tableName: 'FriendGroups',
    // 不要忘记启用时间戳！
    timestamps: true
});

module.exports = FriendGroups;