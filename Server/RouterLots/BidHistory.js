const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../DataBase/SQLQueryForLot');
const ob = require('../ErrorObject/Errors');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.get("/:id", (req, res) => {
    let userId = req.params.id;
    user.getBid(userId).then((result)=> {
        if (result.length !== 0) {
            res.status(201).json({
                Bid: result,
            });
        } else {
            res.status(400).json({
                message: ob.objERRORS.LOT_IMAGE,
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.LOT_IMAGE,
        });
    });
});

router.post("/:id", (req, res) => {

    let lotId = req.params.id;
    let bidValue = req.body;

    user.getBuyer(bidValue, lotId).then((result) => {
        if (result.length === 0){
            user.insertBuyer(bidValue, lotId).then((result)=> {
                if (result.length !== 0) {
                    res.status(200).send("Successfully");
                } else {
                    res.status(409).json({
                        message: ob.objERRORS.LOT_BID,
                    });
                }
            }).catch((error) => {
                res.status(409).json({
                    message: ob.objERRORS.LOT_BID,
                });
            });
        } else {
            user.updateBuyer(bidValue, lotId).then((result)=> {
                if (result.length !== 0) {
                    res.status(200).send("Successfully");
                } else {
                    res.status(409).json({
                        message: ob.objERRORS.LOT_BID,
                    });
                }
            }).catch((error) => {
                res.status(409).json({
                    message: ob.objERRORS.LOT_BID,
                });
            });
        }
    }).catch((error) => {
        res.status(409).json({
            message: ob.objERRORS.LOT_BID,
        });
    });
});

module.exports = router;