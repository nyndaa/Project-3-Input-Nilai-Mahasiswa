const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const LOCAL_DATA_FILE = path.join(__dirname, "data.json");
const DATA_FILE = process.env.VERCEL
    ? path.join("/tmp", "data.json")
    : LOCAL_DATA_FILE;

// Siapkan file data.json (salin data awal ke /tmp jika berjalan di Vercel)
if (!fs.existsSync(DATA_FILE)) {
    if (process.env.VERCEL && fs.existsSync(LOCAL_DATA_FILE)) {
        fs.copyFileSync(LOCAL_DATA_FILE, DATA_FILE);
    } else {
        fs.writeFileSync(DATA_FILE, "[]");
    }
}

// Route utama fallback jika akses "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET DATA
app.get("/nilai", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    res.json(data);
});

// TAMBAH DATA
app.post("/nilai", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

    const newData = {
        id: Date.now(),
        nama: req.body.nama,
        matkul: req.body.matkul,
        nilai: req.body.nilai,
        status: "Pending",
        komentar: ""
    };

    data.push(newData);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({
        message: "Data berhasil ditambahkan"
    });
});

// UPDATE STATUS DOSEN
app.put("/nilai/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);

    if (item) {
        item.status = req.body.status;
        item.komentar = req.body.komentar;

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({
            message: "Berhasil diupdate"
        });
    } else {
        res.status(404).json({
            message: "Data tidak ditemukan"
        });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

module.exports = app;