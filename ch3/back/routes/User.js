const express = require('express');
const router = express.Router();
const passport = require('passport');
const bCrypt = require('bcrypt');
const db = require('../models');


router.post('/', async (req, res, next) => {
	try {
		const hash = await bCrypt.hash(req.body.passWord, 12);

		console.log(
			{
				'users':db.User
			}
		);
		const confirmUser = await db.User.findOne(
			{where:{ email:req.body.email}}
			);
		// if (confirmUser) throw '이미 있는 이메일입니다';
		if (confirmUser){
			// 클라이언트 잘못된 요청
			return res.status(403).json({
				errorCode: 403,
				msg: '이미 있는 아이디 입니다'
			})
		}

		const newUser = await db.User.create({
			email: req.body.email,
			passWord: hash,
			nickName: req.body.nickName
		});
		res.status(201).json(newUser);
	} catch (err) {
		console.log('err', err);
		return next(err);
	}

});

// 이런느낌으로 로그인
router.post('/login', async (req, res, next) => {
	// 단순한 나
	//const locale = locale(req.body.email, req.body.passWord);

	passport.authenticate('local', (err,user,info) => { // 세션에다 사용자 정보 저장 (어떻게 ? seriallizeUser)
		if (err){console.log(err); return next(err)}
		if (info){ return res.status(401).send(info.reason);}
		//    req.login 원래있던거아님. passport login logout middleware 통해서 나옴

		return req.login(user, async (err) =>{
			if (err){console.error('err');return next(err);}

			return res.json(user);
		});
	})(req,res,next);

});

router.post('/logout', function (req,res) {

	console.log({
		req: req
	});
	if (req.isAuthenticated()){
		console.log({'req': req});
		req.logout();
		req.session.destroy(); // 세션 없애기 이부분은 선택사항
		return res.status(200).send('로그아웃 되었습니다');
	}else{
		debugger
	}
});

module.exports = router;
