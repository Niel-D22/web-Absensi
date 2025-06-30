export default function initJadwalPage() {
  const daftarJadwal    = document.getElementById("daftarJadwal");
  const emptyJadwal     = document.getElementById("emptyJadwal");
  const detailContainer = document.getElementById("detailContainer");
  const tplDetail       = document.getElementById("tplDetailTable");
  const form            = document.getElementById("jadwalForm");

  if (!daftarJadwal || !tplDetail || !form) {
    console.error("Elemen penting tidak ditemukan!");
    return;
  }
  const fmtJamDariDateTime = j => {
  const d = new Date(j);
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};


  // Format helpers
  const fmtJam = j => j.slice(0,5);
  const fmtTgl = i => new Date(i).toLocaleDateString("id-ID", {
    year:"numeric", month:"long", day:"numeric"
  });

  // 1) Load  render kartu jadwal
 async function loadJadwal() {
    try {
      const res = await fetch("http://localhost:3000/api/jadwal");
      const data = await res.json();
      daftarJadwal.innerHTML = "";
      if (!data.length) {
        emptyJadwal.style.display = "block";
        return;
      }
      emptyJadwal.style.display = "none";

      data.forEach(j => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
          <div class="card shadow-sm h-100  text-dark">
            <div class="card-body d-flex flex-column">
              <div class="flex-grow-1 clickable">
                <h5 class="card-title">${j.materi}</h5>
                <p class="card-text mb-2">
                  <strong>${fmtTgl(j.tanggal)}</strong> | ${j.ruangan}<br/>
                  <small>${fmtJam(j.jam_mulai)} - ${fmtJam(j.jam_selesai)}</small>
                </p>
              </div>
              <button class="btn btn-sm btn-outline-danger mt-auto btn-delete">Hapus</button>
            </div>
          </div>
        `;

        // Event tampil detail absensi
        col.querySelector(".clickable")
           .addEventListener("click", () => showDetailTable(j.id_jadwal, j.materi));

        // Event hapus jadwal
        col.querySelector(".btn-delete")
           .addEventListener("click", () => deleteJadwal(j.id_jadwal));

        daftarJadwal.appendChild(col);
      });
    } catch (e) {
      console.error("Gagal load jadwal:", e);
    }
  }

  // 2) Tampilkan tabel detail absensi
  async function showDetailTable(id, materi) {
    detailContainer.innerHTML = "";
    const clone = tplDetail.content.cloneNode(true);
    clone.querySelector(".detail-title").textContent = `Detail Absensi — ${materi}`;
    const tbody = clone.querySelector("tbody");

    try {
      const res = await fetch(`http://localhost:3000/api/absensi?id_jadwal=${id}`);
      const abs = await res.json();
      abs.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${a.nama}</td>
          <td>${a.nim}</td>
          <td>${a.status}</td>
          <td>${fmtJamDariDateTime(a.waktu_absen)}</td>
          <td>${a.nomor_meja || "-"}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (e) {
      console.error("Gagal load absensi:", e);
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="5" class="text-center">Data gagal dimuat.</td>`;
      tbody.appendChild(tr);
    }

    detailContainer.appendChild(clone);
    detailContainer.scrollIntoView({ behavior: "smooth" });
  }

  // 3) Hapus jadwal
function deleteJadwal(id) {
  fetch(`http://localhost:3000/api/jadwal/${id}/pindah-ke-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Gagal hapus & pindah ke history");
      return res.json();
    })
    .then((data) => {
      alert(data.message);
      loadJadwal(); // refresh tampilan
    })
    .catch((err) => {
      console.error("Delete error:", err);
    });
}


  // 4) Tangani submit form tambah jadwal
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("http://localhost:3000/api/jadwal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
      form.reset();
      loadJadwal();
    } catch {
      alert("Gagal menambahkan jadwal.");
    }
  });

  // inisiasi pertama
  loadJadwal();
}
