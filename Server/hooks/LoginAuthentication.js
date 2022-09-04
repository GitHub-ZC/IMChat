const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const Message = require("../models/Message");
const User = require("../models/User");
const ManageWebSocket = require("../services/ManageWebSocket");
const authenticate = require("../services/validation/authenticate");


class LoginAuthentication {
    /**
     * 用户登录的钩子函数
     * @param {WebSocketServer} webSocketServer 服务器 实例对象
     * @param {WebSocket} webSocket 用于和客户端通信的 socket
     * @param {Message} messageInstance 需要发送的消息体实例对象
     */
    static check(webSocketServer, webSocket, messageInstance) {
        if (authenticate.checkUser(messageInstance.content)) {
            webSocket.send((new Message({ messageType: MessageType.MESSAGE_LOGIN_SUCCEED })).toString());

            // 识别成功，把user绑定到该WebSocket对象:
            webSocket.user = new User(messageInstance.content);
            ManageWebSocket.addWebSocketTowSocket_Map(messageInstance.content.userId, webSocket);
        } else {
            webSocket.send((new Message({ messageType: MessageType.MESSAGE_LOGIN_FAIL })).toString());
            webSocket.close();
        }

    }
}

module.exports = LoginAuthentication;