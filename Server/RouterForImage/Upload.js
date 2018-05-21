const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../DataBase/SqlQuerySettingUser');
const ob = require('../ErrorObject/Errors');
const path = require('path');

const multer = require( "multer" );
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public');
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.get("/:id", (req, res) => {
    let userId = req.params.id;
    user.getUrlImages(userId).then((result)=> {
        if (result.length !== 0) {
            console.log(result[0].urlImage);
            res.status(201).json({
                urlImage: result[0].urlImage,
            });
        } else {
            res.status(400).json({
                message: ob.objERRORS.USER_SINGUP,
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.USER_SINGUP,
        });
    });
});

router.post("/", upload.single("file"), (req, res) => {

    let data = req.file.path;
    let idUsers = req.body.data;
    user.getUrlImages(idUsers).then((result) => {
        if (result.length === 0){
            user.pushUrlImageToDatabase(data, idUsers).then((result)=> {
                if (result.length !== 0) {
                    res.status(200).send("Successfully");
                } else {
                    res.status(409).json({
                        message: ob.objERRORS.USER_SINGUP,
                    });
                }
            }).catch((error) => {
                res.status(409).json({
                    message: ob.objERRORS.USER_SINGUP,
                });
            });
        } else {
            user.updateUrlImage(data, idUsers).then((result)=> {
                if (result.length !== 0) {
                    res.status(200).send("Successfully");
                } else {
                    res.status(409).json({
                        message: ob.objERRORS.USER_SINGUP,
                    });
                }
            }).catch((error) => {
                res.status(409).json({
                    message: ob.objERRORS.USER_SINGUP,
                });
            });
        }
    }).catch((error) => {
        res.status(409).json({
            message: ob.objERRORS.USER_SINGUP,
        });
    });
});

module.exports = router;