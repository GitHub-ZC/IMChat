const Message = require("../models/Message");
const ManageWebSocket = require("../services/ManageWebSocket");


class OnetoOneSendMessage {
    /**
     * 一对一发送消息
     * @param {Message} messageInstance 传入消息实例参数
     */
    static sendToOne(messageInstance) {
        let senderWebSocket = ManageWebSocket.getWebSocketInwSocket_Map(messageInstance.M_RecvId);

        if (senderWebSocket) {
            console.log(`${messageInstance.M_SendId} send to ${messageInstance.M_RecvId} message : ${messageInstance.M_Content}`);
            senderWebSocket.send(JSON.stringify(messageInstance.toJSON()));
        }
    }
}


module.exports = OnetoOneSendMessage;