document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/history/jadwal")
    .then((res) => res.json())
    .then((data) => renderTabelJadwal(data))
    .catch((err) => console.error("Gagal ambil data jadwal:", err));
});

function renderTabelJadwal(jadwalList) {
  const tbody = document.querySelector("#tabelJadwal tbody");
  tbody.innerHTML = "";

  jadwalList.forEach((jadwal) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${jadwal.id_jadwal}</td>
      <td>${jadwal.nama_matkul || '-'}</td>
      <td>${jadwal.tanggal}</td>
      <td>${jadwal.jam}</td>
      <td><button onclick="lihatDetail(${jadwal.id_jadwal})">Lihat Detail</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function lihatDetail(idJadwal) {
  fetch(`/api/history/absensi/${idJadwal}`)
    .then((res) => res.json())
    .then((data) => renderDetailAbsensi(data))
    .catch((err) => console.error("Gagal ambil detail absensi:", err));
}

function renderDetailAbsensi(data) {
  const tableDiv = document.getElementById("detailAbsensi");
  const tbody = document.getElementById("absensiBody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.nama}</td>
      <td>${row.nim}</td>
      <td>${row.semester}</td>
      <td>${row.tanggal_absen}</td>
      <td>${row.jam_absen}</td>
    `;
    tbody.appendChild(tr);
  });

  tableDiv.style.display = "block";
}
