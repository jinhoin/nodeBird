exports.isLoggedIn = (req,res, next) =>{
	if (req.isAuthenticated()){return next();}
	return res.status(401).send('로그인이 필요합니다');
};

// 객체 그자체다 하지만 module.export 는 조심하도록한다 덮어씌어지낟
// ex) exports === { isLoggendIn:(req, res, next) => {},};
exports.isNotLoggedIn = (req,res,next) =>{
	if (!req.isAuthenticated()){return next();}
	return res.status(401).send('로그인한 사람은 할 수 없습니다..');
};