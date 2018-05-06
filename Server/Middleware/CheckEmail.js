var user = require('../DataBase/SqlQueryAutorizaition');
var ob = require('../ErrorObject/Errors');

exports.checkEmail = function checkEmail(req, res, next) {
    var data = req.body;

    user.checkEmail(data).then(function(result) {
        if (result.length === 0) {
            return next();
        } else {
            res.status(409).json({
                message: ob.objERRORS.USER_SINGUP,
            });
        }
    }).catch(function(error) {
        res.status(404).json({
            message: ob.objERRORS.USER_SINGUP,
        });
    });
};