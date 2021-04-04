const Product = require('../models/mediumQuestions');
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
        question: "Identify which of these are the null sets from the following ?",
        answers: ["	{ }", "ø", "Both (a) and (b)", "{0}"],
        right: "Both (a) and (b)"
    }),
    new Product({
        question: '"n/m" means that n is a factor of m, then the relation T is? ',
        answers: [" relexive, transitive and not symmetric", "relexive, transitive and symmetric", "transitive and symmetric", "relexive and symmetric"],
        right: "relexive and symmetric"
    }),
    new Product({
        question: "Explain if R be a symmetric and transitive relation on a set A, then?",
        answers: ["R is not reflexive and hence not an equivalence relation", "R is reflexive and hence an equivalence relation", "R is reflexive and hence a partial order", "None of these"],
        right: "None of these"
    }),
    new Product({
        question: "Let P(S) denote the power set of set S. select which of the following is always TRUE ?",
        answers: ["S ∉ P(S)", "P(P(S)) = P(S)", "P(S)  ∩ S = P (S)", "P(S)  ∩ P(P(S))  = [ φ ]"],
        right: "P(S)  ∩ P(P(S))  = [ φ ]"
    }),
    new Product({
        question: "A relation R is defined on the set of positive integers as xRy if 2x + y ≤ 5. The realation R is",
        answers: ["reflexive", "transitive", "symmetric", "None of these"],
        right: "transitive"
    }),
    new Product({
        question: "State which of the following sets is a null set ? I. X = {x | x= 9, 2x = 4 } II. Y = {x | x= 2x.x ≠ 0 } III. Z = { x | x-8 = 4 }",
        answers: ["I and II only", "I, II and III", "I and III only", "II and III only"],
        right: "I and II only"
    }),
    new Product({
        question: "If R = ((1, 1), (3, 1), (2, 3), (4, 2)), then which of the following represents R2, where R2 is R composite R?",
        answers: ["((1, 1), (2, 1), (4, 3), (3, 1))", "((1, 1), (3, 1), (2, 3), (4, 2))", "1(1, 3), (3, 3), (3, 4), (3, 2))", "f(1, 1), (9, 1), (4, 9), (16, 4))"],
        right: "((1, 1), (2, 1), (4, 3), (3, 1))"
    }),
    new Product({
        question: "If f : R ---->R defined by f(x) = x2 + 1, then values of f -1 (17) and f -1(-3) are respectively",
        answers: ["{4,-4},Ø", "{Ø},{3,-3}", "{3,-3},{Ø}", "{Ø}, (4, - 4)"],
        right: "{4,-4},Ø"
    }),
    new Product({
        question: ". Let n(A) denotes the number of elements in set A. If n(A) =p and n(B) = q, then how many ordered pairs (a, b) are there with a ∈ A and b ∈B ?",
        answers: ["p x q", "p + q", "2pq", "4pq33333"],
        right: "p x q"
    }),
    new Product({
        question: "The set of all Equivalence classes of a set A of cardinality C ",
        answers: ["forms a partition of A", "is of cardinality 2C", "has the same cardinality as A", " none of these"],
        right: "forms a partition of A"
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