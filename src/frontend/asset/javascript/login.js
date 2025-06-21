document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = form.nama.value.trim();
    const nim = form.nim.value.trim();
    const isNew = form.isNew.checked;

    // Ambil data user yang terdaftar, simpan di key "users"
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek admin login
    const adminLogin = nama === "admin" && nim === "admin123";
    if (adminLogin) {
      const admin = { nama: "admin", nim: "admin123", role: "admin" };
      localStorage.setItem("userAktif", JSON.stringify(admin));
      window.location.href = "admin.html";
      return;
    }

    // Cek input harus diisi
    if (!nama || !nim) {
      showAlert("Nama dan Nim harus diisi");
      return;
    }
    
    if (isNew) {
      // Jika user baru, cek terlebih dahulu apakah nim sudah ada
      if (users.find((u) => u.nim === nim)) {
        showAlert('Nim sudah terdaftar',);
        return;
      }

      // Proses menambahkan data user baru
      const userBaru = { nama, nim, role: 'mahasiswa' };
      users.push(userBaru);

      // Simpan array users ke localStorage dengan key "users" (bukan 'userAktif')
      localStorage.setItem('users', JSON.stringify(users)); 
      showAlert("Registrasi berhasil! Sekarang login tanpa centang", "#4CAF50");
      form.reset();
      return;
    }

    // Proses login user
    const user = users.find(u => u.nama === nama && u.nim === nim);
    if(!user) {
      showAlert('Data tidak ditemukan. Centang jika belum pernah daftar');
      return;
    }
    
    // Simpan user yang sedang login ke localStorage sebagai userAktif
    localStorage.setItem("userAktif", JSON.stringify(user)); 
    window.location.href = 'dashboard.html';
  });
});
