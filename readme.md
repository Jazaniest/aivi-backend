# 🚀 Node.js Express Backend Starter

Ini adalah *base repository* untuk backend menggunakan Node.js dan Express.js. *Setup* ini sudah dilengkapi dengan konfigurasi dasar yang rapi dan modular untuk mempermudah pengembangan secara kolaboratif.

## 🛠️ Teknologi yang Digunakan

* **Node.js** - *Runtime environment*
* **Express.js** - *Web framework*
* **CORS** - *Middleware* untuk mengatur hak akses *resource*
* **Dotenv** - *Environment variables management*
* **Nodemon** - *Development tool* untuk *auto-restart server*

## 📂 Struktur Direktori

```text
├── src/
│   ├── controllers/  # Menyimpan logika utama untuk setiap endpoint
│   ├── routes/       # Menyimpan definisi routing API
│   └── app.js        # Konfigurasi aplikasi Express & Middleware
├── .env.example      # Template untuk environment variables
├── package.json      # Daftar dependency dan script proyek
└── server.js         # Entry point untuk menjalankan server
```
## 💻 Cara Memulai (Untuk Tim)
Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal kamu:

### 1. Fork & Clone Repository
Lakukan fork repositori ini ke akun GitHub kamu, lalu clone ke lokal:

```bash
git clone [https://github.com/USERNAME_KAMU/NAMA_REPOSITORY_KAMU.git](https://github.com/labibabdullah1/aivi-backend.git)

cd aivi-backend
```
### 2. Install Dependencies
Pastikan Node.js sudah terinstal. Jalankan perintah ini untuk mengunduh semua package yang dibutuhkan:

```Bash
npm install
```
### 3. Setup Environment Variables
Duplikasi file .env.example dan ubah namanya menjadi .env:
```Bash
cp .env.example .env
```
>(Catatan: Jangan pernah meng-commit file .env ke GitHub karena berisi kredensial sensitif).

### 4. Jalankan Server
Gunakan script berikut untuk menjalankan server dalam mode development (server akan otomatis restart jika ada perubahan kode):

```Bash
npm run dev
```

Jika berhasil, terminal akan menampilkan pesan: Server berjalan di http://localhost:3000

## 📜 Daftar Script
**npm run dev** : Menjalankan aplikasi menggunakan Nodemon (untuk proses development).

**npm start** : Menjalankan aplikasi menggunakan Node.js biasa (untuk production).

## 🤝 Aturan Berkontribusi (Contribution)
### 1. Pastikan selalu melakukan git pull origin main sebelum membuat branch baru untuk menghindari konflik.

### 2. Buat branch dengan format yang jelas, contoh: feature/login-api atau fix/bug-routing.

### 3. Tulis pesan commit yang deskriptif.