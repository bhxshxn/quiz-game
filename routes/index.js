const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const easy = require('../models/easyQuestions');
router.use('/user', require('../routes/user'));

router.get('/', (req, res) => {
    if (req.cookies.jwt) {
        const result = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.session.user = result.username;
        res.render('main/home', { user: req.session.user });
    } else {
        res.render('main/home', { user: null });
    }
})

router.get('/easy', async (req, res) => {
    const result = await easy.find({});
    res.render('main/easyquiz', { user: req.session.user, result: result });
});


router.post('/submit', async (req, res) => {
    const rightAns = [];
    var point = 0
    const result = await easy.find({});
    result.forEach(element => {
        rightAns.push(element.right);
    });
    const checkAns = await Object.values(req.body)
    for (var i = 0; i < rightAns.length; i++) {
        if (rightAns[i] == checkAns[i]) {
            point++;
        }
    }
    res.render('main/succes', { user: req.session.user, point: point })
});
router
module.exports = router;