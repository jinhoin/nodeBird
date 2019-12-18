const express = require('express');
const db = require('./models');

const app = express();

db.sequelize.sync();
// 미들웨어 req 명령어를 미들웨어로처리
app.use(express.json());
// form data 를 req.body에 넣어주는거
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
    res.status(200).send('안녕 시퀄라이즈')
});

app.post('/user', async (req, res) => {
    try {
        const newUser = await db.User.create({
            email: req.body.email,
            passWord: req.body.passWord,
            nickName: req.body.nickName
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.log('err', err);
        next(err);
    }

});

app.listen(3085, () => {
    console.log(`백앤드 서버 ${3085}번 포트에서 작동중.`);
});