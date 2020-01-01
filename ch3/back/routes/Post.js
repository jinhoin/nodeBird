const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');

const { isLoggedIn, isNotLoggedIn} = require('./middleware');

const router = express.Router();
const upload = multer({
	storage: multer.diskStorage({
		destination(req,file,done){
			done(null, 'uploads');
		},
		filename(req, file, done){
			const ext = path.extname(file.originalname);
			const baseName = path.basename(file.originalname, ext);
			done(null, baseName + Date.now()+ ext);
		},
	}),
	limit: { fileSize: 20 * 1024 * 1024},
});
// ?? 미들웨어를 중간에 끼워넛는다고?

router.post('/images',isLoggedIn, upload.array('image'),(req,res,next) => {
	// 예시데이터
	// req.files = [{filename : '웃는얼굴.png'},{filename : '웃는얼굴.png'}];
	res.json(req.files.map(v => v.filename))
});

router.post('/',isLoggedIn, async (req,res,next) => {
	try {
		// req.boy.content === '안녕하세요 여러분~! #Nodejs #Vue
		// req.body.content, req.body.imagePaths,
		console.log({body : req.body.content});

		const hashTags = req.body.content.match(/#[^\s#]+/g)
		// 해쉬 태그 정규표현식
		const newPost = await db.Post.create({
			contents : req.body.content,
			UserId: req.user.id,
		});
		if (hashTags){
			// db 에 있으면 찾고 없으면 insert
			// 배열 프로미스
			const result = await Promise.all(hashTags.map(tag =>  db.HashTag.findOrCreate({
				where: { name: tag.slice(1).toLowerCase() } // #빼고 소문자로 치환해서
				}))
			);
			await newPost.addHashTags(result.map(r => r[0]));
		}
		const fullPosts = await db.Post.findOne({
			where:{id:newPost.id},
			include: [{model: db.User, attributes: ['id', 'nickName']}]
		});
		res.json(fullPosts);

	}catch (e) {console.log(e); next(e)}
});

module.exports = router;