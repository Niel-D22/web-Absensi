// routes/historyRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // sesuaikan koneksi database kamu

// Ambil semua jadwal
router.get("/jadwal", (req, res) => {
  db.query("SELECT * FROM jadwal", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ambil data absensi berdasarkan id_jadwal
router.get("/absensi/:id_jadwal", (req, res) => {
  const id = req.params.id_jadwal;
  const sql = `
    SELECT m.nama_mhs, m.nim_mhs, m.semester_mhs, a.Waktu_absen, a.status,a.nomor_meja
    FROM absensi a
    JOIN mahasiswa m ON a.id_mahasiswa = m.id_mhs
    WHERE a.id_jadwal = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);

  });
});

module.exports = router;
