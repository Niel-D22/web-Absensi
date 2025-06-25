const express = require("express");
const cors = require("cors");
const db = require("./db");

//inisialisasi aplikasi
const app = express();

//passang middleware
app.use(cors());
app.use(express.json());

// router dasar
app.get("/", (req, res) => {
  res.send(" server jalan");
});

//router mahasiswa
const mahasiswaRouter = require("./routes/mahasiswa");
app.use("/api/mahasiswa", mahasiswaRouter);

const jadwalRouter = require("./routes/jadwal");
app.use("/api/jadwal", jadwalRouter);

const absensiRouter = require("./routes/absensi");
app.use("/api/absensi", absensiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running di http://localhost:${PORT}`);
});
