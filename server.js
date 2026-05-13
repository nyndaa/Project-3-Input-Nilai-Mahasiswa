const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "data.json";

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
}

//GET DATA
app.get("/nilai", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

//TAMBAH DATA
app.post("/nilai", (req, res) => {

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

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

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    const id = parseInt(req.params.id);

    const item = data.find(d => d.id === id);

    if(item){

        item.status = req.body.status;
        item.komentar = req.body.komentar;

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({
            message:"Berhasil diupdate"
        });

    } else {

        res.status(404).json({
            message:"Data tidak ditemukan"
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});