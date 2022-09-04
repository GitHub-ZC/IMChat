const Message = require("../models/Message");
const ManageWebSocket = require("../services/ManageWebSocket");


class OnetoOneSendMessage {
    /**
     * 一对一发送消息
     * @param {Message} messageInstance 传入消息实例参数
     */
    static sendToOne(messageInstance) {
        let senderWebSocket = ManageWebSocket.getWebSocketInwSocket_Map(messageInstance.getter);
        if (senderWebSocket) {
            senderWebSocket.send(messageInstance.toString());
        }
    }
}


module.exports = OnetoOneSendMessage;