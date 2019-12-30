const express = require('express');
const db = require('./models');
const cors = require('cors');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const passPortConfig = require('./passport');
const usersRouter = require('./routes/user');
const app = express();

// 기존데이터 날라가니 조심해야됨
// db.sequelize.sync({force: true});
db.sequelize.sync();
passPortConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    // 서로간 쿠키 공유
    credentials: true,
}));
// 미들웨어 req 명령어를 미들웨어로처리
app.use(express.json());
// form data 를 req.body에 넣어주는거
app.use(express.urlencoded({ extended: false }));

app.use(cookie('cookieSecret'))
// cookie 를 해독할수잇는 암호화 키
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookieSecret',
    cookie: {

    }
}));

// middleware 처리
app.use(passport.initialize());
app.use(passport.session());



app.get('/', function (req, res, next) {
    res.status(200).send('안녕 시퀄라이즈')
});

app.use('/user', usersRouter);

app.post('/post', (req,res) => {
    if (!req.isAuthenticated()){

    }

});


app.listen(3085, () => {
    console.log(`백앤드 서버 ${3085}번 포트에서 작동중.`);
});