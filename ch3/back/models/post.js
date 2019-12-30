module.exports = (seqelize, DataType) => {
	const Post = seqelize.define('Post', { //테이블명은 posts
		contents: {
			type: DataType.TEXT,
			allowNull: false,
		}, //createAt, updateAt 자동생성
	},{
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci'
	});
	Post.associate = (db) => {
		db.Post.belongsTo(db.User); // UserId
		db.Post.hasMany(db.Comment);
		db.Post.belongsToMany(db.HashTag, {through: 'PostHashtag'});

	};
	return Post;

}