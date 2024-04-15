const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const users = {
    admin: { password: 'password' }
};

const login = (req, res) => {
    const { username, password } = req.body;

    const user = users[username];

    if (user && user.password === password) {
        const accessToken = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(401).send('Username or password incorrect');
    }
};

module.exports = {
    login
};
