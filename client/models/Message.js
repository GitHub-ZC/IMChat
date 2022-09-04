
/**
 * 定义消息体 —— 实现类
 */
class Message {
    /**
     * 消息体的构造函数
     * @param {*} sender 发送方
     * @param {*} getter 接收方
     * @param {*} content 消息内容
     * @param {*} sendTime 发送时间
     * @param {*} messageType 消息类型
     */
    constructor(message) {
        this.sender = message.sender;
        this.getter = message.getter;
        this.content = message.content;
        this.sendTime = message.sendTime;
        this.messageType = message.messageType;
    }

    getMessageType() {
        return this.messageType;
    }

    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Message;