const express = require('express');
const router = express.Router();
const user = require('../DataBase/SQLQueryForLot');
const ob = require('../ErrorObject/Errors');
const path = require('path');
const valid = require('../ErrorObject/ValidationError');

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

router.get("/", (req, res) => {
    user.getCategory().then((result)=> {
            res.status(201).json({
                result: result,
            });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.LOT_SECTIONS,
        });
    });
});

router.post("/", upload.any(), valid.validationFieldNewLot, (req, res) => {

        let lotData = JSON.parse(req.body.lotData);
        user.setValueLot(lotData).then((result) => {
            if(req.files.length === 0) {
                return res.status(201).json({
                    message: "ok",
                });
            } else {
                let filesPath = [];
                for (let i = 0; i < req.files.length; i++) {
                    filesPath.push(req.files[i].path);
                }
                user.setImage(filesPath, result.insertId).then((result) => {
                    res.status(201).json({
                        message: "ok",
                    });
                }).catch((error) => {
                    console.log(error);
                    res.status(401).json({
                        message: ob.objERRORS.LOT_IMAGE,
                    });
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.LOT_FORM,
            });
        });
});

module.exports = router;
