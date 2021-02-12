const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateUser = require('../middlewares/authenticateUser');
const User = require('../models/user');
const score = require('../models/score');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
    res.render('main/login', { user: req.session.user, msg: null });
})

router.get('/register', (req, res) => {
    res.render('main/register', { user: req.session.user, msg: null });
});

router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    // check for missing filds
    if (!email || !password || !username) {
        res.render('main/register', { user: req.session.user, msg: "Please enter all the fields" })
        return;
    };
    var user = username.charAt(0).toUpperCase() + username.slice(1);

    const doesUserExitsAlreay = await User.findOne({ email });
    if (doesUserExitsAlreay) {
        res.render('main/register', { user: req.session.user, msg: "Email already exists" });
        return;
    };

    const doesUsernameExitsAlreay = await User.findOne({ username: user });
    if (doesUsernameExitsAlreay) {
        res.render('main/register', { user: req.session.user, msg: "Username already exists" });
        return;
    };

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword, username: user });

    latestUser
        .save()
        .then(() => {
            res.render('main/login', { user: req.session.user, msg: null });
            return;
        })
        .catch((err) => console.log(err));
});

//post for login
router
    .post("/login", async (req, res) => {
        var { username, password } = req.body;

        // check for missing filds
        if (!username || !password) {
            res.send("Please enter all the fields");
            return;
        }
        username = username.charAt(0).toUpperCase() + username.slice(1);
        const doesUserExits = await User.findOne({ username });

        if (!doesUserExits) {
            res.render('main/login', { user: req.session.user, page: "login", msg: "Invalid useranme or password" }); return;
        }

        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
        );

        if (!doesPasswordMatch) {
            res.render('main/login', { user: req.session.user, page: "login", msg: "Invalid useranme or password" });
            return;
        }

        // else he\s logged in
        const jwtToken = jwt.sign({ username: req.body.username }, "2Jyq1y57Ae9MgCE007Z8OGzWKWRQeAPA");
        res.cookie("jwt", jwtToken, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
        req.session.user = username;
        // console.log(req.session.user);
        res.redirect('/');
    })

//logout
router.get("/logout", (req, res) => {
    req.session.user = null;
    res.clearCookie("jwt");
    res.redirect("/");
});

router.get('/history', authenticateUser, async (req, res) => {
    const result = await score.find({ user: req.session.user });
    res.render('main/history', { user: req.session.user, score: result });
});

module.exports = router;