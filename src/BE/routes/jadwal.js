// routes/jadwal.js
const express = require('express');
const router = express.Router();
const db = require('../db');




// GET semua jadwal
router.get('/', (req, res) => {
  db.query('SELECT * FROM jadwal ORDER BY tanggal DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal ambil jadwal' });
    res.json(results);
  });
});

// POST buat jadwal baru
router.post('/', (req, res) => {
  const { materi, tanggal, ruangan, jam_mulai, jam_selesai } = req.body;
  const sql = `INSERT INTO jadwal (materi, tanggal, ruangan, jam_mulai, jam_selesai) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [materi, tanggal, ruangan, jam_mulai, jam_selesai], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal simpan jadwal' });
    res.json({ message: 'Jadwal berhasil ditambahkan', id: result.insertId });
  });
});

module.exports = router;
