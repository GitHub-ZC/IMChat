const WebSocket = require('ws');
const MessageType = require('./models/MessageType');
const Message = require('./models/Message');
const LoginAuthentication = require('./hooks/LoginAuthentication');
const BroadcastMessages = require('./hooks/BroadcastMessages');
const OnetoOneSendMessage = require('./hooks/OnetoOneSendMessage');
const GetTheListOfOnlineUsers = require('./hooks/GetTheListOfOnlineUsers');
const ManageWebSocket = require("./services/ManageWebSocket");
const http = require('http')
const Koa = require('koa');
const koaBody = require('koa-body');
const v1 = require('./routers/contributor');
const { restify } = require('./middlewares/rest');
const { validation } = require('./middlewares/auth');
const cors = require('koa2-cors');


class KoaServer {
    static app = new Koa();

    static createKoaApp() {
        this.app.use(cors());
        // 对于任何请求，this.app将调用该异步函数处理请求：
        this.app.use(async (ctx, next) => {
            const start = new Date().getTime(); // 当前时间
            try {
                await next(); // 调用下一个middleware
                const ms = new Date().getTime() - start; // 耗费时间
                console.log(`${ctx.request.method} ${ctx.request.url} ${ctx.status} Time: ${ms}ms`); // 打印耗费时间
            } catch (e) {
                const ms = new Date().getTime() - start; // 耗费时间
                console.log(`${ctx.request.method} ${ctx.request.url} ${ctx.status} Time: ${ms}ms`); // 打印耗费时间
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code: e.code || 'internal:unknown_error',
                    message: e.message || ''
                };
                throw e;
            }
        });

        this.app.use(koaBody({ multipart: true }));
        this.app.use(restify("/v1/"));
        this.app.use(validation());
        this.app.use(v1.routes());


        return this.app;
    }

}


const WebSocketServer = WebSocket.Server;

class ChatServer {
    KoaApp = KoaServer.createKoaApp();
    server = http.createServer(this.KoaApp.callback());
    // 创建 WebSocket 服务器 监听在 3000 端口
    wss = new WebSocketServer({ server: this.server });

    heartbeat() {
        this.isAlive = true;
    }

    interval = setInterval(() => {
        this.wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) {
                // 从socket集合中移除当前 ws
                ManageWebSocket.removeWebSocketInwSocket_Map(ws.user.U_ID);
                return ws.terminate();
            };

            ws.isAlive = false;
            ws.ping();
        });
    }, 30000);

    constructor() {
        //如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket：
        this.wss.on('connection', (ws, req) => { // 在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接
            ws.isAlive = true;
            ws.on('pong', this.heartbeat);

            // 客户端的IP地址
            const ip = req.socket.remoteAddress;

            // 接收客户端信息并把信息返回发送
            ws.on('message', (message) => {
                // 输出消息日志
                console.log(`${ip} in ${Date.now()} INFO : ${message}`);
                message = JSON.parse(message);

                let ms = new Message(message);

                switch (ms.getMessageType()) {
                    // 登录验证
                    case MessageType.MESSAGE_LOGIN_VALID: {
                        LoginAuthentication.check(this.wss, ws, ms);
                    }; break;
                    // 广播消息
                    case MessageType.MESSAGE_TOALL_ME: {
                        BroadcastMessages.BroadMessages(this.wss, ws, ms);
                    }; break;
                    // 一对一发送消息
                    case MessageType.MESSAGE_COMM_ME: {
                        OnetoOneSendMessage.sendToOne(ms);
                    }; break;
                    // 获取在线用户列表
                    case MessageType.MESSAGE_GET_ONLINE_FRIENO: {
                        GetTheListOfOnlineUsers.getAllOnlineUsers(ws, ms);
                    }; break;
                    // 客户端请求退出
                    case MessageType.MESSAGE_CLIENT_EXIT: {
                        ClientRequestsToExit
                    }; break;
                }
            });


        })


        this.wss.on('close', function close() {
            clearInterval(this.interval);
        });

    }


    start(port) {
        this.server.listen(port);
    }
}


let chat = new ChatServer();
chat.start(3000);