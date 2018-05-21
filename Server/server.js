const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let signUp = require('./RouterSignUp/SignUp');
let loginIn = require('./RouterSignUp/LoginIn');
let jwt = require('jsonwebtoken');
let upload = require('./RouterForImage/Upload');
let updateData = require('./RouterSetting/UpdateData');
let path = require('path');
let http = require('http');
let newLot = require('./RouterLots/NewLot');
let userLot = require('./RouterLots/UserLot');
let allLots = require('./RouterLots/AllLots');
let editLot = require('./RouterLots/EditLot');

const port = process.env.PORT || 8200;

let server = http.createServer(app);
let io = module.exports.io = require('socket.io').listen(server);
let socketConfig = require('./SocketConfig');

io.on('connection', socketConfig);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static((path.join(__dirname, 'public'))));
app.use('/ImageLot', express.static((path.join(__dirname, 'ImageLot'))));

app.use('/', (req, res, next) => {
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
app.use('/newLots', newLot);
app.use('/userLots', userLot);
app.use('/allLots', allLots);
app.use('/editLots', editLot)


app.post("/authorization", (req, res) => {
    jwt.verify(req.body.token, 'Secret', function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            res.status(200).json({ success: true });;
            console.log(decoded);
            //next();
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));