# Sistem Input & Validasi Nilai Mahasiswa

Aplikasi web berbasis **Node.js** dan **Express.js** yang dirancang untuk memfasilitasi proses pelaporan nilai oleh mahasiswa serta validasi (ACC / Tolak) beserta pemberian umpan balik oleh dosen secara terstruktur dan *real-time*.

**Live Demo:** <https://project-3-input-nilai-mahasiswa.vercel.app/>  
**Repository:** <https://github.com/nyndaa/Project-3-Input-Nilai-Mahasiswa>

---

## Fitur Utama

### 1. Dashboard Mahasiswa (`/`)
- **Input Nilai Mandiri:** Formulir pengajuan data nilai berdasarkan Nama Mahasiswa, Mata Kuliah, dan Skor Nilai (`0 - 100`).
- **Pelacakan Status Real-Time:** Menampilkan daftar nilai yang telah diajukan beserta status konfirmasi (**Pending**, **Dikonfirmasi**, atau **Ditolak**) dan catatan komentar dari dosen.
- **Role Switcher & Modal Login Dosen:** Navigasi cepat untuk berpindah ke halaman dosen melalui verifikasi PIN akses.

### 2. Dashboard Dosen (`/dosen.html`)
- **Proteksi Akses (PIN Demo):** Dilindungi verifikasi PIN sebelum masuk ke halaman validasi (**PIN Demo: `1234`**).
- **Validasi Nilai:** Dosen dapat menyetujui (**ACC**) atau menolak (**Tolak**) pengajuan nilai mahasiswa.
- **Catatan Komentar:** Kolom komentar khusus bagi dosen untuk memberikan evaluasi atau alasan penolakan pada setiap data mahasiswa.

---

## Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript, Font Awesome
- **Penyimpanan Data:** Local JSON (`data.json` dengan dukungan `/tmp` pada *serverless environment*)
- **Package Manager:** pnpm / npm
- **Deployment:** Vercel

---

## Struktur Proyek

```text
Project-3-Input-Nilai-Mahasiswa/
└── sistem-penilaian/
    ├── public/
    │   ├── dosen.html       # Antarmuka Dashboard Dosen (validasi & komentar)
    │   ├── index.html       # Antarmuka Dashboard Mahasiswa & modal login dosen
    │   ├── script.js        # Logika fetch API & manipulasi DOM mahasiswa
    │   └── style.css        # Stylesheet utama (Glassmorphism & Responsive UI)
    ├── data.json            # Penyimpanan data nilai mahasiswa
    ├── package.json         # Konfigurasi dependensi proyek
    ├── pnpm-lock.yaml       # Lockfile dependensi pnpm
    └── server.js            # Server Express & REST API endpoints (/nilai)
```

---

## Cara Mengakses & Menjalankan Proyek

### 1. Akses Langsung (Online)
Buka tautan berikut melalui browser tanpa perlu instalasi:
> <https://project-3-input-nilai-mahasiswa.vercel.app/>

*Untuk mencoba fitur validasi pada **Dashboard Dosen**, klik tombol **Masuk Dosen** di pojok kanan atas dan masukkan PIN demo: **`1234`**.*

### 2. Menjalankan di Komputer Lokal (Local Development)

Pastikan **Node.js** sudah terpasang di perangkat Anda, lalu ikuti langkah berikut:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/nyndaa/Project-3-Input-Nilai-Mahasiswa.git
   ```

2. **Masuk ke direktori aplikasi:**
   ```bash
   cd Project-3-Input-Nilai-Mahasiswa/sistem-penilaian
   ```

3. **Install dependensi:**
   Gunakan `pnpm` (direkomendasikan sesuai lockfile) atau `npm`:
   ```bash
   pnpm install
   ```
   atau
   ```bash
   npm install
   ```

4. **Jalankan server:**
   ```bash
   node server.js
   ```

5. **Buka di browser:**
   Akses alamat berikut pada browser Anda:
   ```text
   http://localhost:3000
   ```

---

## Dokumentasi Endpoint API

| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `GET` | `/nilai` | Mengambil seluruh daftar data nilai mahasiswa |
| `POST` | `/nilai` | Menambahkan pengajuan nilai baru dari mahasiswa (status awal `Pending`) |
| `PUT` | `/nilai/:id` | Memperbarui status (`Dikonfirmasi` / `Ditolak`) dan komentar dari dosen |

---

## Pengembang

Dikembangkan oleh **Raharjian Sustanadia Wijayanti**  
GitHub: [@nyndaa](https://github.com/nyndaa)