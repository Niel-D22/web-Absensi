export default function initHistoryPage() {
  fetch("http://localhost:3000/api/history/")
    .then((res) => res.json())
    .then((data) => {
      console.log("Data dari backend:", data);
      renderTabelJadwal(data);
    })
    .catch((err) => console.error("Gagal ambil data jadwal:", err));
}

function renderTabelJadwal(jadwalList) {
  const tbody = document.querySelector("#tabelJadwal tbody");
  tbody.innerHTML = "";

  jadwalList.forEach((jadwal, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${jadwal.materi || '-'}</td>
      <td>${new Date(jadwal.tanggal).toLocaleDateString('id-ID')}</td>
      <td>${jadwal.jam_mulai}</td>
      <td>${jadwal.jam_selesai}</td>
      <td>${jadwal.ruangan}</td>
      <td><button class="lihat-detail-btn" data-id="${jadwal.id_history}" style="border-radius:10px; height:40px; width:100px;  background-color:#4CAF30; ">Lihat Detail</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Pasang event listener setelah render tombol selesai
  document.querySelectorAll(".lihat-detail-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      console.log("Klik tombol detail jadwal id:", id);
      lihatDetail(id);
    });
  });
}

function lihatDetail(idJadwal) {
  fetch(`http://localhost:3000/api/history/absensi/${idJadwal}`)
    .then((res) => res.json())
    .then((data) => renderDetailAbsensi(data))
    .catch((err) => console.error("Gagal ambil detail absensi:", err));
}

function renderDetailAbsensi(data) {
  const tableDiv = document.getElementById("detailAbsensi");
  const tbody = document.getElementById("absensiBody");
  tbody.innerHTML = "";
  if (!Array.isArray(data)) {
    console.error("❌ Data bukan array:", data);
    alert("Gagal menampilkan data absensi. Cek koneksi atau server.");
    return;
  }

  data.forEach((row) => {
    const waktu = new Date(row.Waktu_absen);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.nama_mhs}</td>
      <td>${row.nim_mhs}</td>
      <td>${row.semester_mhs}</td>
      <td>${waktu.toLocaleDateString()}</td>
      <td>${waktu.toLocaleTimeString()}</td>
      <td>${row.status}</td>
      <td>${row.nomor_meja || '-'}</td>
    `;
    tbody.appendChild(tr);
  });

  tableDiv.style.display = "block";
}
