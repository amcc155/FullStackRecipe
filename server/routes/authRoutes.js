const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../db')
const { Router } = require('express');

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING username';
    const values = [username, hashedPassword];


    try {
        const response = await client.query(query, values);
        return res.json({ user: response.rows[0] });

    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Username already in use' })
        }
        return res.status(500).json({ error: err.message });
    }
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
        const response = await client.query(query, values);
        const user = response.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const token = jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '1h' });
        return es.status(200).json({ token });
    } catch (err) {

        return res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = authRouter;