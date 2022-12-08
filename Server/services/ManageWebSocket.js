
/**
 * 存放 socket 的集合类
 */
class ManageWebSocket {
    // 存放 <userID，webSocket>
    static #wSocket_Map = new Map();

    // 获取这个集合
    static get getManageWebSocket() {
        return this.#wSocket_Map;
    }


    /**
     * 获取在线用户列表
     * @returns
     */
    static getAllWebSocketInwSocket_Map() {
        let data = {
            onlineSize: this.#wSocket_Map.size
        };
        let userlists = [];
        this.#wSocket_Map.forEach((element, key) => {
            userlists.push(element);
        })
        data.userlists = userlists;
        return data;
    }


    /**
     * 添加webSocket 到管理集合中
     * @param {*} userId 传入用户ID
     * @param {*} webSocket 传入用户ID对应的 webSocket
     */
    static addWebSocketTowSocket_Map(userId, webSocket) {
        this.#wSocket_Map.set(userId, webSocket.user);
    }


    /**
     * 通过用户ID获取对应的 socket
     * @param {*} userId 传入用户ID
     * @returns 
     */
    static getWebSocketInwSocket_Map(userId) {
        if (!userId) return undefined;
        return this.#wSocket_Map.get(userId);
    }

    /**
     * 删除 管理集合中webSocket
     * @param {*} userId 传入用户ID
     * @returns 
     */
    static removeWebSocketInwSocket_Map(userId) {
        if (!userId) return undefined;
        this.#wSocket_Map.delete(userId);
    }
}


module.exports = ManageWebSocket;