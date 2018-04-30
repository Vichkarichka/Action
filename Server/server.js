const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var signUp = require('./RouterSignUp/SignUp');
var loginIn = require('./RouterSignUp/LoginIn');
var path = require('path');

const multer = require( "multer" );
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '../public')
    },
    filename(req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const port = process.env.PORT || 8200;

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


app.post( "/upload", upload.single( "file" ), ( req, res ) => {
    console.log(req.file, 'file');
    res.sendStatus(200);
} );

app.listen(port, () => console.log(`Listening on port ${port}`));