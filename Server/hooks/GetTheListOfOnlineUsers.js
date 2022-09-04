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
            sender: "Server",
            getter: messageInstance.sender,
            content: AllOnlineUsersInfo,
            messageType: "5",
            sendTime: Date.now()
        })

        webSocket.send(
            send_Message.toString()
        )
    }
}


module.exports = GetTheListOfOnlineUsers;