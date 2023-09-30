const jsonwebToken = require("jsonwebtoken");

const auth = (req, res, next) => {

    // console.log(req.headers);

    try {
        const accessToken = req.headers.authorization.replace("Bearer ", "");
        //Comparing the Token that received from header with our secret key
        const jwt_payload = jsonwebToken.verify(accessToken, process.env.jwt_salt);
        //This req.user will use in userDashboard.js to collect the jwt_payload data
        req.user = jwt_payload

    } 
    catch (err) {
        res.status(401).json({
            status: "failed",
            message: "Unauthorized"
        });
        return;
    }
    // console.log(jwt_payload);


    next();
}

module.exports = auth;