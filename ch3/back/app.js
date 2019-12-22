const express = require('express');
const db = require('./models');
const cors = require('cors');
const bCrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('passport');
const locale = require('./passport/local');
const morgan = require('morgan');
const passPortConfig = require('./passport');
const app = express();

// 기존데이터 날라가니 조심해야됨
// db.sequelize.sync({force: true});
db.sequelize.sync();
passPortConfig();

app.use(morgan('dev'));
app.use(cors('http:/localhost:3000'));
// 미들웨어 req 명령어를 미들웨어로처리
app.use(express.json());
// form data 를 req.body에 넣어주는거
app.use(express.urlencoded({ extended: false }));

app.use(cookie('cookieSecret'))
// cookie 를 해독할수잇는 암호화 키
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookieSecret'
}));

// middleware 처리
app.use(passport.initialize());
app.use(passport.session());



app.get('/', function (req, res, next) {
    res.status(200).send('안녕 시퀄라이즈')
});

app.post('/user', async (req, res, next) => {
    console.log(req.body);
    try {
        const hash = await bCrypt.hash(req.body.passWord, 12);
        const confirmUser = await db.User.findOne({where : { email:req.email }});
        console.log(confirmUser);
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
app.post('/user/login', async (req, res, next) => {
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

app.listen(3085, () => {
    console.log(`백앤드 서버 ${3085}번 포트에서 작동중.`);
});