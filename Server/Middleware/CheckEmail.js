const user = require('../DataBase/SqlQueryAutorizaition');
const ob = require('../ErrorObject/Errors');

exports.checkEmail = (req, res, next) => {
    let data = req.body;

    user.checkEmail(data).then((result) => {
        if (result.length === 0) {
            return next();
        } else {
            res.status(409).json({
                message: ob.objERRORS.USER_EMAIL,
            });
        }
    }).catch((error) => {
        res.status(404).json({
            message: ob.objERRORS.USER_EMAIL,
        });
    });
};
