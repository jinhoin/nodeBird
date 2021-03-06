module.exports = (sequelize, DataType) => {
	const Comment = sequelize.define('Comment', {contents: {type: DataType.TEXT, allowNull: false,}}, {charset: 'utf8mb4', collate: 'utf8mb4_general_ci'});

	Comment.associate = (db) => {
		db.Comment.belongsTo(db.User); // UserId
		db.Comment.belongsTo(db.Post);
	};
	return Comment;
}