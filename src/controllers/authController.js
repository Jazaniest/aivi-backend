const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

const users = [];

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Cek apakah username sudah ada di "database"
        const userExists = users.find(u => u.username === username);
        if (userExists) {
            return res.status(400).json({ status: 'error', message: 'Username sudah digunakan!' });
        }

        // 2. Enkripsi (Hash) password sebelum disimpan agar aman
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Simpan user baru ke dalam array
        const newUser = {
            id: users.length + 1,
            username: username,
            password: hashedPassword
        };
        users.push(newUser);

        res.status(201).json({ status: 'success', message: 'Registrasi berhasil!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server saat registrasi' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Cari user di "database"
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User tidak ditemukan!' });
        }

        // 2. Cocokkan password yang diketik dengan password yang di-hash di "database"
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 'error', message: 'Password salah!' });
        }

        // 3. Jika cocok, buatkan Token JWT
        // Token ini berisi data id dan username, dikunci dengan JWT_SECRET, dan berlaku selama 1 hari
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Kirim token ke klien (frontend)
        res.status(200).json({
            status: 'success',
            message: 'Login berhasil!',
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server saat login' });
    }
};

// Pastikan baris ini ada di paling bawah agar bisa dibaca oleh file route!
module.exports = { register, login, verifyToken };