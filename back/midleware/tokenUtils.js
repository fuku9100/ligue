const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        console.log('Decoded email:', decoded.email);
        return decoded.email;
    } catch (error) {
        console.error('Error in verifyToken:', error);
        return null;
    }
};

exports.getTokenFromRequest = (req) => {
    return req.query.token ? req.query.token : req.headers.authorization;
};