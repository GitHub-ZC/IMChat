const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');

/**
 * 聊天记录表
 */
class Message extends Model {
    getMessageType() {
        return this.M_MessagesType;
    }
}

Message.init({
    M_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // 发送者uid
    M_SendId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // 接收者uid
    M_RecvId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // 消息类型
    M_MessagesType: {
        type: DataTypes.STRING(2),
        defaultValue: "3",// 3 代表普通消息包
        allowNull: false
    },
    // 接受状态
    M_Status: {
        type: DataTypes.STRING(2)
    },
    // 消息内容
    M_Content: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    M_UserGroupID: {
        type: DataTypes.BIGINT
    },
    // 逻辑删除
    IsDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize, // 我们需要传递连接实例
    modelName: 'Message', // 我们需要选择模型名称
    tableName: 'Message',
    // 不要忘记启用时间戳！
    timestamps: true
});


module.exports = Message;