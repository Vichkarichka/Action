const express = require('express');
const router = express.Router();
const user = require('../DataBase/SQLQueryForLot')
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


router.post("/:id", upload.any(), valid.validationFieldNewLot, (req, res) => {

    let lotId = req.params.id;
    let lotData = JSON.parse(req.body.lotData);

    user.updateValueLot(lotData,lotId).then((result) => {
        if(req.files.length === 0) {
            return res.status(201).json({
                message: "ok",
            });
        } else {
            let filesPath = [];
            for (let i = 0; i < req.files.length; i++) {
                filesPath.push(req.files[i].path);
            }
            user.setImage(filesPath, lotId).then((result) => {
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

router.delete("/:id", (req, res) => {

    let idLotImg = req.body.idImage;

    user.deleteImage(idLotImg).then((result) => {
           console.log(result);
        res.status(200).json({
            message: 'ok',
        });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.LOT_IMAGE,
        });
    });
});

router.delete("/", (req, res) => {

    let idLot = req.body.idLot;

    user.deleteLot(idLot).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'ok',
        });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.LOT_FORM,
        });
    });
});


module.exports = router;