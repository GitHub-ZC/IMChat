
/**
 * 定义消息体 —— 实现类
 */
class Message {
    /**
     * 消息体的构造函数
     * @param {*} M_ID 消息ID
     * @param {*} M_SendId 发送方
     * @param {*} M_RecvId 接收方
     * @param {*} M_Content 消息内容
     * @param {*} M_MessagesType 消息类型
     * @param {*} M_UserGroupID 群组id类型
     */
    constructor(message) {
        this.M_ID = message.M_ID;
        this.M_SendId = message.M_SendId;
        this.M_RecvId = message.M_RecvId;
        this.M_Content = message.M_Content;
        this.M_MessagesType = message.M_MessagesType;
        this.M_UserGroupID = message.M_UserGroupID;
    }

    getMessageType() {
        return this.messageType;
    }

    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Message;