// FILE: middleware.js
const { db } = require('../Database/database');
const { verifyToken, getTokenFromRequest } = require('./tokenUtils');

exports.authenticator = (req, res, next) => {
    const token = getTokenFromRequest(req);
    console.log('Token:', token);
    if (token && process.env.API_KEY) {
        const email = verifyToken(token);
        if (email) {
            next();
        } else {
            console.error('Error in authenticator: Invalid token');
            return res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }
};

exports.isAdmin = async (req, res, next) => {
    const token = getTokenFromRequest(req);
    console.log('Token:', token);
    if (!token) {
        console.log('Unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const email = verifyToken(token);
    if (!email) {
        console.log('Unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const conn = await db.getConnection();
        const [result] = await conn.query('SELECT admin FROM users WHERE email = ?', [email]);
        conn.release();

        if (result.length === 0 || result[0].admin !== 1) {
            console.log('Unauthorized');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};