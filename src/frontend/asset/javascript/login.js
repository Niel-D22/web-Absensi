document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = form.nama.value.trim();
    const nim = form.nim.value.trim();
    const isNew = form.isNew.checked;

    if (!nama || !nim) {
      return showAlert("Nama dan NIM harus diisi");
    }

    // ADMIN LOGIN LANGSUNG
    if (nama === "admin" && nim === "admin123") {
      const admin = {
        nama: "admin",
        nim: "admin123",
        role: "admin",
      };
      localStorage.setItem("userAktif", JSON.stringify(admin));
      return (window.location.href = "admin.html");
    }

    // MAHASISWA REGISTRASI (centang)
    if (isNew) {
      try {
        const res = await fetch("http://localhost:3000/api/mahasiswa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama_mhs: nama,
            nim_mhs: nim,
            semester_mhs: "1", // default
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          return showAlert(data.message || "Gagal registrasi");
        }

        showAlert("Registrasi berhasil! Silakan login tanpa centang.", "#4CAF50");
        form.reset();
        return;
      } catch (err) {
        console.error("Gagal registrasi:", err);
        return showAlert("Terjadi kesalahan saat registrasi", "#f44336");
      }
    }

    // LOGIN MAHASISWA
    try {
      const res = await fetch("http://localhost:3000/api/mahasiswa");
      const data = await res.json();

      const user = data.find((u) => u.nama_mhs === nama && u.nim_mhs === nim);
      if (!user) {
        return showAlert("Data tidak ditemukan. Centang jika belum daftar.");
      }

      localStorage.setItem(
        "userAktif",
        JSON.stringify({
          nama: user.nama_mhs,
          nim: user.nim_mhs,
          role: user.role || "mahasiswa",
          semester: user.semester_mhs,
        })
      );
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error("Gagal login:", err);
      showAlert("Terjadi kesalahan saat login", "#f44336");
    }
  });
});
