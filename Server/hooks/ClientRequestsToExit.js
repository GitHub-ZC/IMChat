const ManageWebSocket = require("../services/ManageWebSocket");




class ClientRequestsToExit {
    static exit(webSocket, messageInstance) {
        try {
            webSocket.close();
            ManageWebSocket.removeWebSocketInwSocket_Map(webSocket.user.U_ID);
        } catch (error) {
            ManageWebSocket.removeWebSocketInwSocket_Map(messageInstance.M_SendId);
            console.log(error);
        }
    }
}


module.exports = ClientRequestsToExit;