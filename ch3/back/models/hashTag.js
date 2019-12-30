module.exports = (sequelize, DataType) => {
	const HashTag = sequelize.define('HashTag',{ name : { type: DataType.STRING(20), allowNull: false}}, {charset: 'utf8mb4'});

	HashTag.associate = (db) => {db.HashTag.belongsToMany(db.Post, {through: 'PostHashTag'});}

	return HashTag
}