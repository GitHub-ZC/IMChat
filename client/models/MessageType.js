
// 定义消息体的类型参数
MessageType = {
    MESSAGE_LOGIN_SUCCEED: "1",//登陆成功
    MESSAGE_LOGIN_FAIL: "2",//登陆失败
    MESSAGE_COMM_ME: "3",//普通消息包
    MESSAGE_GET_ONLINE_FRIENO: "4",//要求返回在线用户列表
    MESSAGE_RET_ONLINE_FRIENO: "5",//返回在线用户列表
    MESSAGE_CLIENT_EXIT: "6",//客户端请求退出
    MESSAGE_TOALL_ME: "7",//广播消息包
}

module.exports = MessageType;