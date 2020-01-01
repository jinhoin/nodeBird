const passPort = require('passport');
const local = require('./local');
const db = require('../models');
// 함수를 모듈로 해야 재화룡이 쉬움
module.exports = () => {
	//req.user.login 이 오면 사용자의 아이디만 저장함
	passPort.serializeUser((user, done)=>{
		return done(null, user.id);
	});
	// 로그인 후 모든 요청 사용자 정보를 복구한다
	passPort.deserializeUser(async (id, done)=>{
		try {
			const user = await  db.User.findOne({where: {id}}); // 캐싱 처리해준다
			return done(null, user); //req,user, req.isAuthenticated() === true, 로 만들어준다
		}catch (err) {
			return done(err);
		}
	});
	local();
};