const { DataTypes, Model } = require('sequelize');
const sequelize = require('./InitSequelize');

/**
 * 用户表
 */
class User extends Model {

}

User.init({
    // (用户 U_ID)
    U_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // (登陆账号)  
    U_LoginID: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    // (昵称)
    U_NickName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    // (密码, 存放MD5)
    U_PassWord: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // md5 salt
    U_Salt: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    // (个性签名)
    U_SignaTure: {
        type: DataTypes.STRING(150)
    },
    // (头像) 
    U_HeadPortrait: {
        type: DataTypes.STRING(150),
        defaultValue: '' //url地址
    },
    // (生日)
    U_Birthday: {
        type: DataTypes.DATEONLY
    },
    // (root = 管理员， normal=普通用户，vip=特权用户)
    U_Type: {
        type: DataTypes.STRING(10)
    },
    // 二级密码（密码找回保留信息）
    password_adv: {
        type: DataTypes.STRING
    },
    // (电话 一个电话只能绑定一个 userID)
    U_Telephone: {
        type: DataTypes.STRING(20),
        unique: true
    },
    // (邮箱 一个邮箱只能绑定一个 userID)
    U_Email: {
        type: DataTypes.STRING(50),
        unique: true
    },
    // (个人简介)
    U_Intro: {
        type: DataTypes.STRING(300)
    },
    // (年龄)
    U_Age: {
        type: DataTypes.INTEGER
    },
    // (性别)
    U_Sex: {
        type: DataTypes.STRING(2)
    },
    // (血型)
    U_BloodType: {
        type: DataTypes.STRING(10)
    },
    // (生肖)
    U_ShengXiao: {
        type: DataTypes.STRING(10)
    },
    // (星座)
    U_Constellation: {
        type: DataTypes.STRING(10)
    },

    // (外键 ——— 用户状态ID)
    U_UserStateID: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    // (备注)
    remark: {
        type: DataTypes.STRING(500)
    },
    // 逻辑上的删除
    isdelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User', // 我们需要选择模型名称
    tableName: 'User'
});


module.exports = User;