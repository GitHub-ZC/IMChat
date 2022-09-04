const ManageWebSocket = require("../services/ManageWebSocket");




class ClientRequestsToExit {
    static exit(webSocket, messageInstance) {
        try {
            webSocket.close();
            ManageWebSocket.removeWebSocketInwSocket_Map(webSocket.user.userId);
        } catch (error) {
            ManageWebSocket.removeWebSocketInwSocket_Map(messageInstance.sender);
            console.log(error);
        }
    }
}


module.exports = ClientRequestsToExit;