// 함수를 모듈로
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        email: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        nickName: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        passWord: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci' //한글
    });
    User.associate = (db) => {};
    return User;
}