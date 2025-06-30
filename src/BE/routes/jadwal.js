const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET semua jadwal
router.get("/", (req, res) => {
  db.query("SELECT * FROM jadwal", (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal ambil jadwal" });
    res.json(results);
  });
});

// POST buat jadwal baru
router.post("/", (req, res) => {
  const { materi, tanggal, ruangan, jam_mulai, jam_selesai } = req.body;
  const sql = `INSERT INTO jadwal (materi, tanggal, ruangan, jam_mulai, jam_selesai) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [materi, tanggal, ruangan, jam_mulai, jam_selesai], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal simpan jadwal" });
    res.json({ message: "Jadwal berhasil ditambahkan", id: result.insertId });
  });
});

// Pindahkan dan hapus jadwal
router.post("/:id/pindah-ke-history", (req, res) => {
  const idJadwal = req.params.id;

  db.query("SELECT * FROM jadwal WHERE id_jadwal = ?", [idJadwal], (err, result) => {
    if (err || result.length === 0) return res.status(500).json({ error: "Jadwal tidak ditemukan." });

    const jadwal = result[0];

    db.query(
      `INSERT INTO history (materi, tanggal, jam_mulai, jam_selesai, ruangan) VALUES (?, ?, ?, ?, ?)`,
      [jadwal.materi, jadwal.tanggal, jadwal.jam_mulai, jadwal.jam_selesai, jadwal.ruangan],
      (err2, insertResult) => {
        if (err2) return res.status(500).json({ error: "Gagal simpan ke history." });

        const idHistoryBaru = insertResult.insertId;

        db.query(`UPDATE absensi SET id_history = ? WHERE id_jadwal = ?`, [idHistoryBaru, idJadwal], (err3) => {
          if (err3) return res.status(500).json({ error: "Gagal update absensi." });

          db.query("DELETE FROM jadwal WHERE id_jadwal = ?", [idJadwal], (err4) => {
            if (err4) return res.status(500).json({ error: "Gagal hapus jadwal." });

            res.json({ message: "Jadwal dipindah ke history dan absensi diperbarui." });
          });
        });
      }
    );
  });
});

module.exports = router;
