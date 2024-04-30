const jwt = require('jsonwebtoken');
const { db } = require('../Database/database');

const getemailFromtoken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        console.log('Decoded email:', decoded.email);
        return decoded.email;
    } catch (error) {
        console.error('Error in getemailFromtoken:', error);
        return null;
    }
}
exports.authenticator = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    console.log('Token:', token);
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                console.error('Error in authenticator:', err);
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                next();
            }
        });
    } else {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }
};


exports.isadmin = async (req, res, next) => {
    const token = req.query.token || req.headers.authorization;
    console.log('Token:', token);
    if (!token) {
        console.log('Unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const email = getemailFromtoken(token);
    if (!email) {
        console.log('Unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const conn = await db.getConnection();
        const [result] = await conn.query('SELECT admin FROM users WHERE email = ?', [email]);
        conn.release();

        if (result.length === 0) {
            console.log('Unauthorized');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (result[0].admin === 1) {
            next();
        } else {
            console.log('Unauthorized');
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error in isadmin middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};