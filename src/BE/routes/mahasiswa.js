const express = require("express");
const router = express.Router();
const db = require("../config/db");

//1. read, ambil mahasiswa
// endpoint GET /api/mahasiswa

router.get("/", (req, res) => {
  db.query(
    "SELECT id_mhs, nama_mhs, nim_mhs, semester_mhs FROM mahasiswa WHERE role = ?",
    ["mahasiswa"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

// 2. create tambah data mahasiswa
// endpoint POST /api/mahasiswa

router.post("/", (req, res) => {
  const { nama_mhs, nim_mhs, semester_mhs } = req.body;

  if (!nama_mhs || !nim_mhs || !semester_mhs) {
    return res.status(400).json({ message: "Semua data harus diisi" });
  }

  // Tentukan role secara otomatis
  const role = nama_mhs.toLowerCase() === "admin" ? "admin" : "mahasiswa";

  const sql =
    "INSERT INTO mahasiswa (nama_mhs, nim_mhs, semester_mhs, role) VALUES (?, ?, ?, ?)";
  db.run(sql, [nama_mhs, nim_mhs, semester_mhs, role], function (err) {
    if (err) {
      return res.status(500).json({ message: "Gagal tambah data" });
    }
    res.status(201).json({ message: "Berhasil tambah mahasiswa" });
  });
});

// 3. UPDATE ubah data mahasiswa dari nim
// endpoint PUT /api/mahasiswa/:nim
router.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log("Setelah di edit", req.body);

  const { nama_mhs, nim_mhs, semester_mhs } = req.body;

  if (!nama_mhs || !nim_mhs || !semester_mhs) {
    return res.status(400).json({ message: "semua data harus di isi" });
  }
  db.query(
    "UPDATE mahasiswa SET nama_mhs=?,nim_mhs=?,semester_mhs=? WHERE id_mhs = ? AND role =?",
    [nama_mhs, nim_mhs, semester_mhs, id, "mahasiswa"],
    (err, result) => {
      //jka eror
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      //jika nim tdk di temukan
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "mahasiswa tidak di temukan" });
      }
      //jika suskes
      res.json({ message: "Berhasil mengupdet data mahasiswa" });
    }
  );
});

// 4.delete hapus data mahasiswa dari nim
// emdpoint DELETE /api/mahasiswa/:nim
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log("DELETE mahasiswa:", id);

  db.query(
    "DELETE FROM mahasiswa WHERE id_mhs = ? AND role = ?",
    [id, "mahasiswa"],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Terjadi kesalahan saat menghapus data",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
      }

      return res.status(200).json({ message: "Berhasil hapus data mahasiswa" });
    }
  );
});

module.exports = router;
