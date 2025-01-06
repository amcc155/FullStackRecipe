require('dotenv').config();
const jwt = require('jsonwebtoken');
const client = require('../db');
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET);
        const user = await client.query('SELECT * FROM users WHERE id=$1', [payload.userId]);
        req.user = user.rows[0];
        next();
    } catch (err) {
        res.status(401).json({ error: 'Not authorized' });
    }
    }

module.exports = authenticate;