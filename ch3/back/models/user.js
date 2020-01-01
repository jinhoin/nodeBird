 // 함수를 모듈로
module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        email: {type: DataType.STRING(20), allowNull: false, unique: true,},
        nickName: {type: DataType.STRING(15), allowNull: false},
        passWord: {type: DataType.STRING(100), allowNull: false},
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci' //한글
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
    };
    return User;
}