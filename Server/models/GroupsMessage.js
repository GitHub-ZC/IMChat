const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');

/**
 * 群消息内容
 */
class GroupsMessage extends Model {
    getMessageType() {
        return this.M_MessagesType;
    }
}

GroupsMessage.init({
    GM_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // 发送者uid    外键
    GM_SendId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // 群消息ID    外键
    GM_UserGroupID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // 消息内容
    GM_Content: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    // 逻辑删除
    IsDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize, // 我们需要传递连接实例
    modelName: 'GroupsMessage', // 我们需要选择模型名称
    tableName: 'GroupsMessage',
    // 不要忘记启用时间戳！
    timestamps: true
});


module.exports = GroupsMessage;