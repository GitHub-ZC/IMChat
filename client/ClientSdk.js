const WebSocket = require('ws');
const Message = require('./models/Message');



class Client {
    ws = new WebSocket('ws://localhost:3000');

    heartbeat() {
        clearTimeout(this.pingTimeout);

        // Use `WebSocket#terminate()`, which immediately destroys the connection,
        // instead of `WebSocket#close()`, which waits for the close timer.
        // Delay should be equal to the interval at which your server
        // sends out pings plus a conservative assumption of the latency.
        this.pingTimeout = setTimeout(() => {
            this.terminate();
        }, 30000 + 1000);
    }


    constructor(token) {
        // 发送
        this.ws.on('open', () => {
            this.ws.send(JSON.stringify({
                messageType: "8",
                content: {
                    token
                }
            }));
        });

        // 接收
        this.ws.on('message', (message) => {
            let ms = new Message(JSON.parse(message))
            if (ms.messageType === '1') {
                console.log("登录成功");
            } else if (ms.messageType === '2') {
                console.log("登陆失败");
            } else if (ms.messageType === '3') {
                console.log(ms.toString());
            } else if (ms.messageType === '7') {
                console.log(ms.toString());
            }
        });


        this.ws.on('open', this.heartbeat);
        this.ws.on('ping', this.heartbeat);
        this.ws.on('close', function clear() {
            clearTimeout(this.pingTimeout);
        });
    }

    sendData(recvId, content) {
        this.ws.send(JSON.stringify({
            M_SendId: token.split('313i&m&1203').pop(),
            M_RecvId: recvId,
            M_MessagesType: "3",//普通消息包
            M_Content: content
        }));
    }
}

//let cs = new Client("d3444d938b9059ba6a462d265b77ff7915545188590c5e9094e9840bec824c45313i&m&12032");
module.exports = Client;