const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Backend Node.js berhasil berjalan!',
        data: null
    });
});

module.exports = router;