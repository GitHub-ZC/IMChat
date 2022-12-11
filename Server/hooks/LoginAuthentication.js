const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const Message = require("../models/Message");
const User = require("../models/User");
const ManageWebSocket = require("../services/ManageWebSocket");
const Authenticate = require("../services/validation/Authenticate");


class LoginAuthentication {
    /**
     * 用户登录的钩子函数
     * @param {WebSocketServer} webSocketServer 服务器 实例对象
     * @param {WebSocket} webSocket 用于和客户端通信的 socket
     * @param {Message} messageInstance 需要发送的消息体实例对象
     */
    static async check(webSocketServer, webSocket, messageInstance) {
        if (Authenticate.checkUser(messageInstance.content)) {
            const user_form_database = await User.findOne({ where: { U_ID: JSON.parse(messageInstance.content).token.split('313i&m&1203').pop() } });
            webSocket.send((new Message({ messageType: MessageType.MESSAGE_LOGIN_SUCCEED })).toString());

            // 识别成功，把user绑定到该WebSocket对象:
            webSocket.user = user_form_database;
            ManageWebSocket.addWebSocketTowSocket_Map(user_form_database.U_ID, webSocket);
        } else {
            webSocket.send((new Message({ messageType: MessageType.MESSAGE_LOGIN_FAIL })).toString());
            webSocket.close();
        }
    }
}

module.exports = LoginAuthentication;