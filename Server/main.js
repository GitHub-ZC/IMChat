const WebSocket = require('ws');
const MessageType = require('./models/MessageType');
const Message = require('./models/Message');
const LoginAuthentication = require('./hooks/LoginAuthentication');
const BroadcastMessages = require('./hooks/BroadcastMessages');
const OnetoOneSendMessage = require('./hooks/OnetoOneSendMessage');
const GetTheListOfOnlineUsers = require('./hooks/GetTheListOfOnlineUsers');
const http = require('http')
const Koa = require('koa');
const koaBody = require('koa-body');
const v1 = require('./routers/contributor');
const { restify } = require('./middlewares/rest');
const cors = require('koa2-cors');


class KoaServer {
    static app = new Koa();

    static createKoaApp() {
        this.app.use(cors());
        // 对于任何请求，this.app将调用该异步函数处理请求：
        this.app.use(async (ctx, next) => {
            const start = new Date().getTime(); // 当前时间
            await next(); // 调用下一个middleware
            const ms = new Date().getTime() - start; // 耗费时间
            console.log(`${ctx.request.method} ${ctx.request.url} ${ctx.status} Time: ${ms}ms`); // 打印耗费时间
        });

        this.app.use(koaBody({ multipart: true }));
        this.app.use(restify("/v1/"));
        this.app.use(v1.routes());


        return this.app;
    }

}


const WebSocketServer = WebSocket.Server;

class ChatServer {
    KoaApp = KoaServer.createKoaApp();
    server = http.createServer(this.KoaApp.callback());
    // 创建 WebSocket 服务器 监听在 3000 端口
    wss = new WebSocketServer({ noServer: true });


    constructor() {

        this.server.on('upgrade', (request, socket, head) => {
            // This function is not defined on purpose. Implement it with your own logic.
            authenticate(request, function next(err, client) {
                if (err || !client) {
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();
                    return;
                }

                this.wss.handleUpgrade(request, socket, head, (ws) => {
                    this.wss.emit('connection', ws, request);
                });
            });
        });


        //如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket：
        this.wss.on('connection', (ws, req) => { // 在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接
            // 客户端的IP地址
            const ip = req.socket.remoteAddress;

            // 接收客户端信息并把信息返回发送
            ws.on('message', (message) => {
                // 输出消息日志
                console.info(`${ip} in ${Date.now()} INFO : ${message}`);

                message = JSON.parse(message);
                // console.log(message);

                let ms = new Message(message);
                console.log(ms.toJSON());

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

    }


    start(port) {
        this.server.listen(port);
    }
}


let chat = new ChatServer();
chat.start(3000);