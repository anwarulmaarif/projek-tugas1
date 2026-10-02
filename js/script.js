document.addEventListener('DOMContentLoaded', function () {
  // ==========================================
  // 1. LOAD HEADER TERPISAH (header.html)
  // ==========================================
  const headerContainer = document.getElementById('main-header');
  if (headerContainer) {
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;

        // Tandai menu yang aktif sesuai halaman saat ini
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        if (currentPage === 'dashboard.html') {
          const nav = document.getElementById('nav-dashboard');
          if (nav) nav.classList.add('active');
        } else if (currentPage === 'stock.html') {
          const nav = document.getElementById('nav-stock');
          if (nav) nav.classList.add('active');
        } else if (currentPage === 'tracking.html') {
          const nav = document.getElementById('nav-tracking');
          if (nav) nav.classList.add('active');
        }

        // Re-attach Event Logout setelah header selesai dimuat
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
          btnLogout.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('userLogin');
            window.location.href = 'index.html';
          });
        }
      })
      .catch(error => console.error('Gagal memuat header:', error));
  }

  // ==========================================
  // 2. LOGIKA LOGIN & MODAL (index.html)
  // ==========================================
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault(); // Mencegah reload halaman

      const emailInput = document.getElementById('email').value.trim();
      const passwordInput = document.getElementById('password').value.trim();
      const alertError = document.getElementById('alert-error');

      // Validasi dengan dataPengguna dari data.js
      const user = dataPengguna.find(u => u.email === emailInput && u.password === passwordInput);

      if (user) {
        if (alertError) alertError.style.display = 'none';
        // Simpan data login ke localStorage
        localStorage.setItem('userLogin', JSON.stringify(user));
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
      } else {
        if (alertError) {
          alertError.style.display = 'block';
        } else {
          alert('Email atau password salah!');
        }
      }
    });

    // Modal Lupa Password
    const modalLupa = document.getElementById('modal-lupa');
    const btnLupaModal = document.getElementById('btn-lupa-modal');
    const closeLupa = document.getElementById('close-lupa');

    if (btnLupaModal && modalLupa) {
      btnLupaModal.onclick = () => modalLupa.style.display = 'block';
    }
    if (closeLupa && modalLupa) {
      closeLupa.onclick = () => modalLupa.style.display = 'none';
    }

    const formLupa = document.getElementById('form-lupa');
    if (formLupa) {
      formLupa.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Instruksi pemulihan password telah dikirim ke email Anda.');
        if (modalLupa) modalLupa.style.display = 'none';
      });
    }

    // Modal Daftar Akun
    const modalDaftar = document.getElementById('modal-daftar');
    const btnDaftarModal = document.getElementById('btn-daftar-modal');
    const closeDaftar = document.getElementById('close-daftar');

    if (btnDaftarModal && modalDaftar) {
      btnDaftarModal.onclick = () => modalDaftar.style.display = 'block';
    }
    if (closeDaftar && modalDaftar) {
      closeDaftar.onclick = () => modalDaftar.style.display = 'none';
    }

    const formDaftar = document.getElementById('form-daftar');
    if (formDaftar) {
      formDaftar.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Pendaftaran berhasil! Silakan login menggunakan email dan password Anda.');
        if (modalDaftar) modalDaftar.style.display = 'none';
      });
    }

    // Tutup Modal saat klik luar modal
    window.onclick = function (event) {
      if (modalLupa && event.target === modalLupa) modalLupa.style.display = 'none';
      if (modalDaftar && event.target === modalDaftar) modalDaftar.style.display = 'none';
    };
  }


  // ==========================================
  // 3. LOGIKA DASHBOARD (dashboard.html)
  // ==========================================
  const greetingText = document.getElementById('greeting-text');
  if (greetingText) {
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const userInfo = document.getElementById('user-info');

    // Menentukan Salam Sesuai Jam Sistem
    const hour = new Date().getHours();
    let salam = 'Selamat Pagi';
    if (hour >= 11 && hour < 15) salam = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) salam = 'Selamat Sore';
    else if (hour >= 18 || hour < 4) salam = 'Selamat Malam';

    if (userLogin) {
      greetingText.innerText = `${salam}, ${userLogin.nama}!`;
      if (userInfo) {
        userInfo.innerHTML = `
          <p style="margin-bottom: 8px;"><strong>Nama Lengkap:</strong> ${userLogin.nama}</p>
          <p style="margin-bottom: 8px;"><strong>Email:</strong> ${userLogin.email}</p>
          <p style="margin-bottom: 8px;"><strong>Peran (Role):</strong> ${userLogin.role}</p>
          <p style="margin-bottom: 8px;"><strong>Lokasi Kerja:</strong> ${userLogin.lokasi}</p>
        `;
      }
    } else {
      greetingText.innerText = `${salam}, Pengguna!`;
      if (userInfo) {
        userInfo.innerHTML = `<p>Silakan <a href="index.html">login</a> terlebih dahulu untuk melihat informasi akun.</p>`;
      }
    }
  }


  // ==========================================
  // 4. LOGIKA TRACKING DO (tracking.html)
  // ==========================================
  const formSearchDO = document.getElementById('form-search-do');
  if (formSearchDO) {
    formSearchDO.addEventListener('submit', function (e) {
      e.preventDefault();
      const noDO = document.getElementById('input-no-do').value.trim();
      const hasilBox = document.getElementById('hasil-tracking');

      const data = dataTracking[noDO];

      if (data) {
        document.getElementById('track-no-do').innerText = data.nomorDO;
        document.getElementById('track-nama').innerText = data.nama;
        document.getElementById('track-ekspedisi').innerText = data.ekspedisi;
        document.getElementById('track-tanggal').innerText = data.tanggalKirim;
        document.getElementById('track-paket').innerText = data.paket;
        document.getElementById('track-total').innerText = data.total;
        document.getElementById('track-status').innerText = data.status;

        const timelineList = document.getElementById('track-timeline');
        timelineList.innerHTML = '';

        data.perjalanan.forEach(item => {
          const li = document.createElement('li');
          li.className = 'timeline-item';
          li.innerHTML = `<strong>${item.waktu}</strong><br>${item.keterangan}`;
          timelineList.appendChild(li);
        });

        hasilBox.style.display = 'block';
      } else {
        alert('Nomor DO tidak ditemukan! Contoh Nomor DO yang valid: 2023001234 atau 2023005678');
        hasilBox.style.display = 'none';
      }
    });
  }


  // ==========================================
  // 5. LOGIKA TABEL STOK (stock.html)
  // ==========================================
  const tbodyStok = document.getElementById('tbody-stok');

  if (tbodyStok) {
    function renderTable() {
      tbodyStok.innerHTML = '';

      dataBahanAjar.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.kodeLokasi}</td>
          <td>${item.kodeBarang}</td>
          <td>${item.namaBarang}</td>
          <td>${item.jenisBarang}</td>
          <td>${item.edisi}</td>
          <td><strong>${item.stok}</strong></td>
          <td style="text-align: center;">
            <button type="button" class="btn-detail" onclick="lihatDetail(${index})" title="Lihat Detail" style="background: none; border: none; cursor: pointer; font-size: 16px;">
              👁️
            </button>
          </td>
        `;
        tbodyStok.appendChild(tr);
      });
    }

    renderTable();

    // Tambah Stok Baru
    const formTambahStok = document.getElementById('form-tambah-stok');
    if (formTambahStok) {
      formTambahStok.addEventListener('submit', function (e) {
        e.preventDefault();

        const newItem = {
          kodeLokasi: document.getElementById('add-lokasi').value,
          kodeBarang: document.getElementById('add-kode').value,
          namaBarang: document.getElementById('add-nama').value,
          jenisBarang: document.getElementById('add-jenis').value,
          edisi: document.getElementById('add-edisi').value,
          stok: parseInt(document.getElementById('add-stok').value),
          cover: 'assets/pengantar_komunikasi.jpg' // Default cover untuk data baru
        };

        dataBahanAjar.push(newItem);
        renderTable();
        formTambahStok.reset();
        alert('Data bahan ajar berhasil ditambahkan!');
      });
    }

    // Modal Control untuk Detail
    const modalDetail = document.getElementById('modal-detail');
    const closeDetail = document.getElementById('close-detail');
    const btnTutupDetail = document.getElementById('btn-tutup-detail');

    if (closeDetail && modalDetail) {
      closeDetail.onclick = () => modalDetail.style.display = 'none';
    }
    if (btnTutupDetail && modalDetail) {
      btnTutupDetail.onclick = () => modalDetail.style.display = 'none';
    }

    window.addEventListener('click', function (event) {
      if (modalDetail && event.target === modalDetail) {
        modalDetail.style.display = 'none';
      }
    });
  }
  


  // ==========================================
  // 6. LOGIKA LOGOUT
  // ==========================================
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('userLogin');
      window.location.href = 'index.html';
    });
  }

});
// Fungsi global untuk membuka modal detail bahan ajar
function lihatDetail(index) {
  const item = dataBahanAjar[index];
  const modalDetail = document.getElementById('modal-detail');

  if (item && modalDetail) {
    document.getElementById('detail-cover').src = item.cover || 'assets/pengantar_komunikasi.jpg';
    document.getElementById('detail-lokasi').value = item.kodeLokasi;
    document.getElementById('detail-kode').value = item.kodeBarang;
    document.getElementById('detail-nama').value = item.namaBarang;
    document.getElementById('detail-jenis').value = item.jenisBarang;
    document.getElementById('detail-edisi').value = item.edisi;
    document.getElementById('detail-stok').value = item.stok;

    modalDetail.style.display = 'block';
  }
}