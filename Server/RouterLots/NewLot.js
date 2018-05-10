var express = require('express');
var router = express.Router();
var user = require('../DataBase/SQLQueryForLot');
var ob = require('../ErrorObject/Errors');
var path = require('path');
var bodyParser = require('body-parser');


const multer = require( "multer" );

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './ImageLot');
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get("/", function(req, res) {
    user.getCategory().then((result)=> {
            res.status(201).json({
                result: result,
            });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.USER_SIGNUP,
        });
    });
});

router.post("/", upload.single("file"), (req, res) => {

    let filePath = req.file.path;
    let lotData = JSON.parse(req.body.lotData);
    user.setValueLot(filePath, lotData).then((result) => {
        res.status(200).json({
            message: "Ok",
        });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.USER_SIGNUP,
        });
    });
});



module.exports = router;