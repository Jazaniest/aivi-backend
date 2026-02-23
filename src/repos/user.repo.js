// repositories/user.repo.js
const pool = require('../config/db');

/**
 * Cari user berdasarkan email
 */
const findByEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0];
};

/**
 * Cari user berdasarkan ID
 */
const findById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT id, name, email, negara_id, provinsi_id, kabupaten_id FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0];
};

/**
 * Insert user baru ke database
 */
const createUser = async ({ name, email, password, negara_id, provinsi_id, kabupaten_id }) => {
  const [result] = await pool.execute(
    `INSERT INTO users 
     (name, email, password, negara_id, provinsi_id, kabupaten_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, password, negara_id, provinsi_id, kabupaten_id]
  );

  return result.insertId;
};

/**
 * Ambil semua user (tanpa password)
 */
const getAllUsers = async () => {
  const [rows] = await pool.execute(
    'SELECT id, name, email, negara_id, provinsi_id, kabupaten_id FROM users'
  );
  return rows;
};

/**
 * Hapus user
 */
const deleteUser = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  getAllUsers,
  deleteUser,
};