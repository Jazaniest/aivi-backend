const express = require('express');
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Endpoint publik (tidak butuh token)
router.post('/register', register);
router.post('/login', login);

// Endpoint privat (BUTUH token untuk diakses)
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        status: 'success',
        message: 'Ini adalah rute terproteksi',
        user: req.user // Data ini berasal dari token yang di-decode di middleware
    });
});

module.exports = router;