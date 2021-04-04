const Product = require('../models/hardQuestions');
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
        question: "State number of subsets that a set of order three has",
        answers: ["2", "4", "6", "8"],
        right: "2"
    }),
    new Product({
        question: "If X and Y are two sets, then identify X ∩ (Y ∪ X) C equals ?",
        answers: ["X", "Y", "Ø", "None of these"],
        right: "Ø"
    }),
    new Product({
        question: "Identify If f : X -> Y and a, b ⊆ X, then f (a ∩ b) is equal to ",
        answers: ["f(a) - f(b)", "f(a) ∩ f(b)", "  f(b) - f(a)", "a proper subset of f(a) ∩ f(b)"],
        right: "a proper subset of f(a) ∩ f(b)"
    }),
    new Product({
        question: "State the number of elements in the power set of the set {{a, b}, c}",
        answers: ["2", "4", "6", "8"],
        right: "4"
    }),
    new Product({
        question: "If every element of a group G is its own inverse, then G is (remember)",
        answers: ["abeian", "cyclic", "finite", "infinite"],
        right: "abeian"
    }),
    new Product({
        question: "State The universal relation A x A on A ",
        answers: ["anti-symmetric", "an equivalence relation", "a partial ordering relation", "not symmetric and not anti-symmetric"],
        right: "an equivalence relation"
    }),
    new Product({
        question: "Locate Total number of diferent partitions of a set having four elements",
        answers: ["5", "10", "15", "20"],
        right: "15"
    }),
    new Product({
        question: "In a beauty contest, half the number of experts voted for Mr. A and two thirds voted for Mr. B. 10 voted for both and 6 did not vote for either. How many experts were there in all ?",
        answers: ["18", "24", "36", "44"],
        right: "24"
    }),
    new Product({
        question: ". G(e, a, b, c} is an abelian group with 'e' as identity element. The order of the other elements are",
        answers: ["2,2,4", "2,2,3", "2,3,4", "3,3,3"],
        right: "2,2,3"
    }),
    new Product({
        question: "If * is defined on R* as a * b = (ab/2) then identity element in the group (R*, *) is ",
        answers: ["1", "2", "1/2", "1/3"],
        right: "2"
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