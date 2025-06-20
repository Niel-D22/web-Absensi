function renderTabelMahasisw(){
//mengambil data simpet ke variabel user
const user = JSON.parse(localStorage.getItem("users")) || [];

//filter role mahasiswa
const mahasiswaList = user.filter((user) => user.role === "mahasiswa");

//isi ke dalam tabel mahasiswa di html yg namanya mahasiswa.html
const tbody = document.getElementById("tabelMahasiswa");
if(!tbody) return;

tbody.innerHTML = "";

//tambah semua data mahasisa ke tabel
mahasiswaList.forEach((mhs, index) => {
  const row = `
    <tr>
    <td>${index + 1}</td>
    <td>${mhs.nama}</td>
    <td>${mhs.nim}</td>
    <td><button onclick="hapusMahasiswa('${mhs.nim}')">Hapus</button>
        <button onclick="editMahasiswa('${mhs.nim}')">Edit</button>
    </td>
    </tr> 
    `;
  tbody.innerHTML += row;
});
}
function hapusMahasiswa(nimTarget) {
  //konfirmasi
  if (!confirm("lanjut menghapus ini?")) return;
// Ambil ulang data lengkap dari localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  // hapus darri array di data users
  const updateUsers = users.filter(
    (user => !(user.role == "mahasiswa" && user.nim === nimTarget))
  );
  //simpan ke dalam localStorage lagi
  localStorage.setItem("users", JSON.stringify(updateUsers));

  const isiWeb = document.getElementById("isi-web");
  fetch("./pages/mahasiswa.html")
    .then((res) => res.text())
    .then((html) => {
      isiWeb.innerHTML = html;
      import("./asset/javascript/kelolaMahasiswa.js");
    });
}
function editMahasiswa(nimTarget) {
  const mhs = user.find((u) => u.role == "mahasiswa" && u.nim == nimTarget);
  if (!mhs) return alert("mahasiswa tidak di temukan!");

  const namaBaru = prompt("edit nama:", mhs.nama);
  const nimBaru = prompt("edit nim:", mhs.nim);
  if (!namaBaru || !nimBaru) return alert("data harus di isi");

  mhs.nama = namaBaru;
  mhs.nim = nimBaru;

  localStorage.setItem("users", JSON.stringify(user));

  const isiWeb = document.getElementById("isi-web");
  fetch("pages/mahasiswa.html")
    .then((res) => res.text())
    .then((html) => {
      isiWeb.innerHTML = html;
      import("./asset/javascript/kelolaMahasiswa.js");
    });
}

window.hapusMahasiswa = hapusMahasiswa;
window.editMahasiswa = editMahasiswa;
