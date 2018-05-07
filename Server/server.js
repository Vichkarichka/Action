const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var signUp = require('./RouterSignUp/SignUp');
var loginIn = require('./RouterSignUp/LoginIn');
var jwt = require('jsonwebtoken');
var user = require('./DataBase/SqlQuerySettingUser');
var ob = require('./ErrorObject/Errors');
var upload = require('./RouterForImage/Upload');
var updateData = require('./RouterSetting/UpdateData');
var path = require('path');
var http = require('http');
const port = process.env.PORT || 8200;

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    socket.emit('news', 'Good News');

    socket.on('send', function (data) {
        io.emit('news', data);
        console.log(data);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static((path.join(__dirname, 'public'))));

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
app.use('/upload', upload);
app.use('/settingData', updateData);

app.post("/authorization", (req, res) => {
    jwt.verify(req.body.token, 'Secret', function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            res.sendStatus(200);
            console.log(decoded);
            //next();
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));