const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const authRoutes = require('./routes/authRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Untuk memparsing JSON dari request body
app.use(express.urlencoded({ extended: true }));

// Routing dasar
app.use('/api', routes);

// Routing autentikasi
app.use('/api/auth', authRoutes);

// Handling route yang tidak ditemukan (404)
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint tidak ditemukan'
    });
});

module.exports = app;