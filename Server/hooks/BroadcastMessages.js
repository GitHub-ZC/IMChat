const WebSocket = require("ws");



class BroadcastMessages {
    /**
     * 用户登录的钩子函数
     * @param {WebSocketServer} webSocketServer 服务器 实例对象
     * @param {WebSocket} webSocket 用于和客户端通信的 socket
     * @param {Message} messageInstance 需要发送的消息体实例对象
     */
    static BroadMessages(webSocketServer, webSocket, messageInstance) {
        webSocketServer.clients.forEach(function (client) {
            if (client !== webSocket && client.readyState === WebSocket.OPEN) {
                client.send(messageInstance.toString());
            }
        });

    }
}

module.exports = BroadcastMessages;