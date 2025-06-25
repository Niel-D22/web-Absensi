const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const id_jadwal = req.query.id_jadwal;
  if (!id_jadwal) {
    return res.status(400).json({ message: "Parameter id_jadwal wajib diisi" });
  }

  const sql = `
    SELECT a.id_absensi, a.status, a.waktu_absen, a.nomor_meja,
           m.nama_mhs AS nama, m.nim_mhs AS nim, m.semester_mhs AS semester
    FROM absensi a
    JOIN mahasiswa m ON a.id_mahasiswa = m.id_mhs
    WHERE a.id_jadwal = ?
    ORDER BY a.waktu_absen ASC
  `;

  db.query(sql, [id_jadwal], (err, results) => {
    if (err) {
      console.error('Error query absensi:', err);  // <-- Tambah ini
      return res.status(500).json({ message: "Gagal mengambil data absensi" });
    }
    console.log('Hasil query absensi:', results); // <-- Tambah ini untuk cek data yang dikirim
    res.json(results);
  });
});
module.exports = router; 