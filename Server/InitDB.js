const Fridendship = require("./models/Fridendship");
const Message = require("./models/Message");
const User = require("./models/User");
const UsersOnline = require("./models/UsersOnline");
const FriendGroups = require("./models/FriendGroups");
const UserGroups = require("./models/UserGroups");
const UserGroupsToUser = require("./models/UserGroupsToUser");





// 数据库模型迁移，根据模型自动生成数据库表
(async () => {
    await User.sync();
    await Fridendship.sync();
    await Message.sync();
    await UsersOnline.sync();
    await FriendGroups.sync();
    await UserGroups.sync();
    await UserGroupsToUser.sync();
})();