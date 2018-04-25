const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var signUp = require('./RouterSignUp/SignUp');
var loginIn = require('./RouterSignUp/LoginIn');


const port = process.env.PORT || 8100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    if (req.method !== "OPTIONS") {
        next();
    }
    if (req.method === "OPTIONS") {
        res.send();
    }
});

app.use('/signUp', signUp);
app.use('/loginIn', loginIn);

app.listen(port, () => console.log(`Listening on port ${port}`));