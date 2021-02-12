const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const easy = require('../models/easyQuestions');
const score = require('../models/score');
router.use('/user', require('../routes/user'));


router.get('/', (req, res) => {
    if (req.cookies.jwt) {
        const result = jwt.verify(req.cookies.jwt, "2Jyq1y57Ae9MgCE007Z8OGzWKWRQeAPA");
        req.session.user = result.username;
        res.render('main/home', { user: req.session.user });
    } else {
        req.session.user = null;
        res.render('main/index', { user: req.session.user });
    }
})


router.get('/easy', async (req, res) => {
    const result = await easy.find({});
    res.render('main/easyquiz', { user: req.session.user, result: result });
});


router.post('/submit/:id', async (req, res) => {
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
    if (req.session.user) {
        const latestScore = new score({ diff: req.params.id, score: point, user: req.session.user });
        await latestScore
            .save()
            .then(() => {
                res.render('main/succes', { user: req.session.user, point: point })
                return;
            })
            .catch((err) => console.log(err));
    } else {
        res.render('main/succes', { user: req.session.user, point: point })
    }
});


module.exports = router;