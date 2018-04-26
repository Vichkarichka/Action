jwt.verify(response.data.token, 'Secret', function(err, decoded) {
    if (err) {
        console.log(err);
        // return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;
        console.log(decoded);
        //next();
    }
});