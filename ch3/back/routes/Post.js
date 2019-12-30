const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('./middleware');

const router = express.Router();

// ?? 미들웨어를 중간에 끼워넛는다고?
router.post('/',isLoggedIn,(req,res,next) => {

});

router.post('/images',isLoggedIn, (req,res,next) => {

});

module.exports = router;