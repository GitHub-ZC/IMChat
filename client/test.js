const WebSocket = require('ws');
const Message = require('./models/Message');



class Client {
    ws = new WebSocket('ws://localhost:3000/foo');

    constructor() {
        // 发送
        this.ws.on('open', () => {
            this.ws.send(JSON.stringify({
                M_MessagesType: "8",
                M_SendContent: {
                    userId: '2018110753',
                    passWd: '123456...',
                    nickName: 'ZCT'
                }
            }));

            // this.ws.send(JSON.stringify({
            //     messageType: "4",
            //     content: '',
            //     sender: '2018110753'
            // }));
            // for (let index = 0; index < 5; index++) {
            //     this.ws.send(JSON.stringify({
            //         sender: '2018110753',
            //         getter: '2018110755',
            //         messageType: "3",
            //         content: '我是 ZCT， 给你发2018110754消息'
            //     }));
            // }

            // for (let index = 0; index < 5; index++) {
            //     this.ws.send(JSON.stringify({
            //         sender: '2018110753',
            //         getter: '2018110754',
            //         messageType: "3",
            //         content: '我是 ZCT， 给你发2018110754消息'
            //     }));
            // }

            // for (let index = 0; index < 5; index++) {
            //     this.ws.send(JSON.stringify({
            //         sender: '2018110753',
            //         getter: '2018110756',
            //         messageType: "3",
            //         content: '我是 ZCT， 给你发2018110754消息'
            //     }));
            // }
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
            } else if (ms.messageType === '5') {
                console.log(ms.toString());
            }
        });
    }
}

let cs = new Client();