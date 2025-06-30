// routes/historyRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // sesuaikan koneksi database kamu

// Ambil semua history jadwal
router.get("/", (req, res) => {
  const sql = "SELECT * FROM history_jadwal ORDER BY tanggal DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ambil data absensi berdasarkan id_history
router.get("/absensi/:id", (req, res) => {
  const idHistory = req.params.id;
  const sql = `
    SELECT m.nama_mhs, m.nim_mhs, m.semester_mhs, a.Waktu_absen, a.status,a.nomor_meja
    FROM absensi a
    JOIN mahasiswa m ON a.id_mahasiswa = m.id_mhs
    WHERE a.id_history = ?
  `;
  db.query(sql, [idHistory], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);

  });
});

module.exports = router;
