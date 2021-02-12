const express = require('express');
require('dotenv').config();
const app = express();
const cookieparser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


//session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieparser());
app.use(express.static('public'));
app.use(express.urlencoded({ extened: true }));
app.use('/', require('./routes/index'));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './views'));

const URL = "mongodb+srv://bhxshxn:bhxshxn@9@cluster0.ixoza.mongodb.net/QuizGameretryWrites=true&w=majority";
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully on port 27017!!!');
});

app.listen(port, () => {
    console.log(`Server is running at :http://localhost:${port}/`);
});