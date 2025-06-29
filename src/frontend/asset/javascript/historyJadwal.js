export default function initHistoryPage() {
  fetch("http://localhost:3000/api/history/jadwal")
    .then((res) => res.json())
    .then((data) => {
      console.log("Data dari backend:", data);
      renderTabelJadwal(data);
    })
    .catch((err) => console.error("Gagal ambil data jadwal:", err));



document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/history/jadwal")
    .then((res) => res.json())
    .then((data) => {
      console.log("Data dari backend:", data); // <-- debug penting
      renderTabelJadwal(data);
    })
    .catch((err) => console.error("Gagal ambil data jadwal:", err));
});


function renderTabelJadwal(jadwalList) {
  const tbody = document.querySelector("#tabelJadwal tbody");
  tbody.innerHTML = "";

  jadwalList.forEach((jadwal,index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${jadwal.materi || '-'}</td>
    <td>${new Date(jadwal.tanggal).toLocaleDateString('id-ID')}</td>

      <td>${jadwal.jam_mulai}</td>
      <td>${jadwal.jam_selesai}</td>
      <td>${jadwal.ruangan}</td>
 
      <td><button onclick="lihatDetail(${jadwal.id_jadwal})">Lihat Detail</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function lihatDetail(idJadwal) {
  fetch(`http://localhost:3000/api/absensi/${idJadwal}`)
    .then((res) => res.json())
    .then((data) => renderDetailAbsensi(data))
    .catch((err) => console.error("Gagal ambil detail absensi:", err));
}

function renderDetailAbsensi(data) {
  const tableDiv = document.getElementById("detailAbsensi");
  const tbody = document.getElementById("absensiBody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const waktu = new Date(row.Waktu_absen);
    tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.nama_mhs}</td>
      <td>${row.nim_mhs}</td>
      <td>${row.semester_mhs}</td>
      <td>${waktu.toLocaleDateString()}</td>
      <td>${waktu.toLocaleTimeString()}</td>
      <td>${row.nomor_meja || '-'}</td>
    `;
    tbody.appendChild(tr);
  });

  tableDiv.style.display = "block";
}
}