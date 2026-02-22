const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Mengambil token dari header Authorization (Format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ status: 'error', message: 'Token tidak disediakan!' });
    }

    // Memverifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'error', message: 'Token tidak valid atau kadaluarsa!' });
        }

        // Menyimpan data user dari token ke dalam request untuk digunakan di controller
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;