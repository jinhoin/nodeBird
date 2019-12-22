const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const db = require('../models');
const bCrypt = require('bcrypt');

module.exports = () => {
	passport.use(new LocalStrategy({
	usernameField: 'email', // req.body.email
	passwordField: 'passWord' // req.body.password
	}, async (email, passWord, done) => {
		try {
			const exUser = await db.User.findOne({where : {email}});
			if (!exUser){ 		// callback 에러 실패
				return done(null, false, { reason: '존재하지 않는 사용자입니다'});
			}
			const result = await bCrypt.compare(passWord, exUser.passWord);
			if (result){
				return done(null, exUser);
			}else {
				return done(null, false, { reason: '비밀번호가 틀리네요'});
			}
		}catch (err) {
			console.error(err);
			return done(err);
		}

	}));
};