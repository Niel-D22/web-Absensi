

function renderTabelMahasisw(){
fetch("http://localhost:3000/api/mahasiswa")
.then(response => response.json())
.then(mahasiswaList =>{
  


//isi ke dalam tabel mahasiswa di html yg namanya mahasiswa.html
const tbody = document.getElementById("tabelMahasiswa");
if(!tbody) return;

tbody.innerHTML = "";

//tambah semua data mahasisa ke tabel
mahasiswaList.forEach((mhs, index) => {
  const row = `
    <tr>
    <td>${index + 1}</td>
    <td>${mhs.nama_mhs}</td>
    <td>${mhs.nim_mhs}</td>
    <td>${mhs.semester_mhs || "-"}</td>
    <td><button onclick="hapusMahasiswa('${mhs.id_mhs}')">Hapus</button>
        <button onclick="editMahasiswa('${mhs.id_mhs}')">Edit</button>
    </td>
    </tr> 
    `;
  tbody.innerHTML += row;
});
})
.catch(error =>{
  console.error("gagal ambil data dari server :", error);
  showAlert("gagal ambil data dari server","#f44336")
});
}




function hapusMahasiswa(id_mhs) {
  if (!confirm("Lanjut menghapus ini?")) return;

  fetch(`http://localhost:3000/api/mahasiswa/${id_mhs}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    
    })
    .then((data) => {
      showAlert(data.message || "Berhasil hapus data mahasiswa", "#4CAF50");
      renderTabelMahasisw();
    })
    .catch((err) => {
      console.error("Gagal menghapus:", err);
      showAlert("Terjadi kesalahan saat menghapus data!", "#f44336");
    });
}





async function editMahasiswa(id_mhs) {
  //cari data ditabel
  try{
  const res = await fetch("http://localhost:3000/api/mahasiswa")
  const mahasiswaList= await res.json()
  const mhs = mahasiswaList.find((u)=> u.id_mhs == id_mhs)
if(!mhs) return showAlert("mahasiswa tdk ditemukan");
//prom edit naama
const namaBaru = prompt("Edit nama:",mhs.nama_mhs);
const nimBaru = prompt("Edit nim:", mhs.nim_mhs);
const semesterBaru =prompt("Edit semester:",mhs.semester_mhs ||"")

if(!namaBaru?.trim()|| !nimBaru?.trim() || !semesterBaru.trim()){
  return showAlert("data tidak boleh kosong")
}
if(parseInt(semesterBaru) <1 || parseInt(semesterBaru)> 8){
  return showAlert("semester harus di antara 1-8")
}
fetch(`http://localhost:3000/api/mahasiswa/${id_mhs}`,{
  method: "PUT",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    nama_mhs: namaBaru.trim(),
    nim_mhs:nimBaru.trim(),
    semester_mhs:semesterBaru.trim(),
  }),
})
.then((res)=>res.json())
.then((data)=>{
  if(data.message){
showAlert(data.message, "#4CAF50");
    renderTabelMahasisw()
  }else{
    showAlert("gagal mengedit data"," #F44336")
  }
})

} catch(err){
  console.error(err);
  showAlert("terjadi kesalahan saat edit","#f44336")
}

}

window.hapusMahasiswa = hapusMahasiswa;
window.editMahasiswa = editMahasiswa;
renderTabelMahasisw();
