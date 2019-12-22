const passPort = require('passport');

// 함수를 모듈로 해야 재화룡이 쉬움
module.exports = () => {
	//req.user.login 이 오면 사용자의 아이디만 저장함
	passPort.serializeUser((user, done)=>{
		return done(null, user.id);
	});
	passPort.deserializeUser(()=>{});
};