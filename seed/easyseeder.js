const Product = require('../models/easyQuestions');
const mongoose = require('mongoose');

const url = "mongodb+srv://bhxshxn:bhxshxn@9@cluster0.ixoza.mongodb.net/QuizGameretryWrites=true&w=majority"
mongoose.connect(url, {
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

const product = [
    new Product({
        question: "What is your name?",
        answers: ["Bhushan", "Yash", "Pratibha", "Alisha"],
        right: "Bhushan"
    }),
    new Product({
        question: "What is your age?",
        answers: ["17", "18", "19", "20"],
        right: "20"
    }),

];

var done = 0;
for (var i = 0; i < product.length; i++) {
    product[i].save((err, result) => {
        done++;
        if (done == product.length) {
            exit();
        }
    })
};
function exit() {
    mongoose.disconnect();
    console.log('done');
}