const { WebSocketServer } = require("ws");
const Message = require("../models/Message");
const ManageWebSocket = require("../services/ManageWebSocket");




class GetTheListOfOnlineUsers {
    /**
     * 获取所有在线用户的逻辑处理部分
     * @param {WebSocket} webSocket 用于和客户端通信的 socket
     * @param {Message} messageInstance 需要发送的消息体实例对象
     */
    static getAllOnlineUsers(webSocket, messageInstance) {
        let AllOnlineUsersInfo = ManageWebSocket.getAllWebSocketInwSocket_Map();

        let send_Message = new Message({
            M_SendId: "Server",
            M_RecvId: messageInstance.M_SendId,
            M_Content: AllOnlineUsersInfo,
            M_MessagesType: "5"
        })

        webSocket.send(
            JSON.stringify(send_Message.toJSON())
        )
    }
}


module.exports = GetTheListOfOnlineUsers;