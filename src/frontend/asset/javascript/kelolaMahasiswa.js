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
    <td>${mhs.semester || "-"}</td>
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
  showAlert("Berhasil Hapus Data mahasiswa", "#4CAF50")

renderTabelMahasisw()
}
function editMahasiswa(nimTarget) {
    const user = JSON.parse(localStorage.getItem("users")) || [];
  const mhs = user.find((u) => u.role == "mahasiswa" && u.nim == nimTarget);
  if (!mhs) return ShowAlert("mahasiswa tidak di temukan!");

  const namaBaru = prompt("edit nama:", mhs.nama);
  const nimBaru = prompt("edit nim:", mhs.nim);
  const semester= prompt("Edit Semester:", mhs.semester || "");
  if (!namaBaru || !nimBaru || !semester) return showAlert("data harus di isi");

if(parseInt(semester) < 1 || parseInt(semester)> 8) 
  return showAlert("semester harus diantara 1-8");

  mhs.nama = namaBaru;
  mhs.nim = nimBaru;
  mhs.semester= semester;

  localStorage.setItem("users", JSON.stringify(user));

    renderTabelMahasisw()

}

window.hapusMahasiswa = hapusMahasiswa;
window.editMahasiswa = editMahasiswa;
renderTabelMahasisw();
