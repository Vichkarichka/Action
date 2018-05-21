const express = require('express');
const router = express.Router();
const user = require('../DataBase/SQLQueryForLot')
const ob = require('../ErrorObject/Errors');
const path = require('path');

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


router.post("/:id", upload.any(), (req, res) => {

    let lotId = req.params.id;

    let filesPath = [];

    for(let i = 0; i < req.files.length; i++){
        filesPath.push(req.files[i].path);
    }

    let lotData = JSON.parse(req.body.lotData);
    user.updateValueLot(lotData,lotId).then((result) => {
        user.setImage(filesPath, lotId).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.USER_SIGNUP,
            });
        });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.USER_SIGNUP,
        });
    });
});

module.exports = router;