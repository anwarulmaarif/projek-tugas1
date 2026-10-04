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


                // ==========================================
                // TOMBOL HAMBURGER MOBILE
                // ==========================================

                const menuToggle = document.getElementById('menu-toggle');
                const mainNav = document.getElementById('main-nav');

                if (menuToggle && mainNav) {

                    menuToggle.addEventListener('click', function () {

                        mainNav.classList.toggle('mobile-open');

                        const isOpen =
                            mainNav.classList.contains('mobile-open');

                        menuToggle.textContent =
                            isOpen ? '✕' : '☰';

                        menuToggle.setAttribute(
                            'aria-label',
                            isOpen ? 'Tutup menu' : 'Buka menu'
                        );

                    });

                }


                // ==========================================
                // DROPDOWN LAPORAN - MOBILE
                // ==========================================

                const laporanMenu =
                    document.querySelector('.dropdown');

                if (laporanMenu) {

                    const laporanLink =
                        laporanMenu.querySelector(':scope > a');

                    if (laporanLink) {

                        laporanLink.addEventListener(
                            'click',
                            function (event) {

                                // Dropdown hanya menggunakan
                                // sistem click pada mobile.
                                if (window.innerWidth <= 768) {

                                    event.preventDefault();

                                    laporanMenu.classList.toggle('open');

                                }

                            }
                        );

                    }

                }


                // ==========================================
                // TUTUP MENU SETELAH MEMILIH LINK
                // ==========================================

                if (mainNav) {

                    const navLinks =
                        mainNav.querySelectorAll('a');

                    navLinks.forEach(function (link) {

                        link.addEventListener(
                            'click',
                            function () {

                                // Jangan tutup menu ketika
                                // yang diklik adalah Laporan.
                                if (
                                    window.innerWidth <= 768 &&
                                    !link.parentElement.classList.contains(
                                        'dropdown'
                                    )
                                ) {

                                    mainNav.classList.remove(
                                        'mobile-open'
                                    );

                                    if (menuToggle) {

                                        menuToggle.textContent = '☰';

                                        menuToggle.setAttribute(
                                            'aria-label',
                                            'Buka menu'
                                        );

                                    }

                                }

                            }
                        );

                    });

                }


                // ==========================================
                // TANDAI MENU AKTIF
                // SESUAI HALAMAN SAAT INI
                // ==========================================

                const currentPage =
                    window.location.pathname
                        .split('/')
                        .pop() || 'dashboard.html';


                if (currentPage === 'dashboard.html') {

                    const nav =
                        document.getElementById('nav-dashboard');

                    if (nav) {
                        nav.classList.add('active');
                    }

                }

                else if (currentPage === 'stock.html') {

                    const nav =
                        document.getElementById('nav-stock');

                    if (nav) {
                        nav.classList.add('active');
                    }

                }

                else if (currentPage === 'tracking.html') {

                    const nav =
                        document.getElementById('nav-tracking');

                    if (nav) {
                        nav.classList.add('active');
                    }

                }


                // ==========================================
                // LOGOUT
                // HEADER SUDAH SELESAI DIMUAT
                // ==========================================

                const btnLogout =
                    document.getElementById('btn-logout');

                if (btnLogout) {

                    btnLogout.addEventListener(
                        'click',
                        function (e) {

                            e.preventDefault();

                            localStorage.removeItem('userLogin');

                            window.location.href =
                                'index.html';

                        }
                    );

                }

            })
            .catch(error =>
                console.error(
                    'Gagal memuat header:',
                    error
                )
            );

    }


    // ==========================================
    // 2. LOGIKA LOGIN & MODAL
    // (index.html)
    // ==========================================

    const formLogin =
        document.getElementById('form-login');

    if (formLogin) {

        formLogin.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();

                const emailInput =
                    document
                        .getElementById('email')
                        .value
                        .trim();

                const passwordInput =
                    document
                        .getElementById('password')
                        .value
                        .trim();

                const alertError =
                    document.getElementById('alert-error');


                // Validasi dengan dataPengguna
                // dari data.js

                const user =
                    dataPengguna.find(
                        u =>
                            u.email === emailInput &&
                            u.password === passwordInput
                    );


                if (user) {

                    if (alertError) {
                        alertError.style.display = 'none';
                    }

                    // Simpan data login
                    localStorage.setItem(
                        'userLogin',
                        JSON.stringify(user)
                    );

                    // Redirect ke dashboard
                    window.location.href =
                        'dashboard.html';

                }

                else {

                    if (alertError) {

                        alertError.style.display =
                            'block';

                    }

                    else {

                        alert(
                            'Email atau password salah!'
                        );

                    }

                }

            }
        );


        // ==========================================
        // MODAL LUPA PASSWORD
        // ==========================================

        const modalLupa =
            document.getElementById('modal-lupa');

        const btnLupaModal =
            document.getElementById('btn-lupa-modal');

        const closeLupa =
            document.getElementById('close-lupa');


        if (btnLupaModal && modalLupa) {

            btnLupaModal.onclick = function () {

                modalLupa.style.display = 'block';

            };

        }


        if (closeLupa && modalLupa) {

            closeLupa.onclick = function () {

                modalLupa.style.display = 'none';

            };

        }


        const formLupa =
            document.getElementById('form-lupa');

        if (formLupa) {

            formLupa.addEventListener(
                'submit',
                function (e) {

                    e.preventDefault();

                    alert(
                        'Instruksi pemulihan password telah dikirim ke email Anda.'
                    );

                    if (modalLupa) {
                        modalLupa.style.display = 'none';
                    }

                }
            );

        }


        // ==========================================
        // MODAL DAFTAR AKUN
        // ==========================================

        const modalDaftar =
            document.getElementById('modal-daftar');

        const btnDaftarModal =
            document.getElementById('btn-daftar-modal');

        const closeDaftar =
            document.getElementById('close-daftar');


        if (btnDaftarModal && modalDaftar) {

            btnDaftarModal.onclick = function () {

                modalDaftar.style.display = 'block';

            };

        }


        if (closeDaftar && modalDaftar) {

            closeDaftar.onclick = function () {

                modalDaftar.style.display = 'none';

            };

        }


        const formDaftar =
            document.getElementById('form-daftar');

        if (formDaftar) {

            formDaftar.addEventListener(
                'submit',
                function (e) {

                    e.preventDefault();

                    alert(
                        'Pendaftaran berhasil! Silakan login menggunakan email dan password Anda.'
                    );

                    if (modalDaftar) {
                        modalDaftar.style.display = 'none';
                    }

                }
            );

        }


        // ==========================================
        // TUTUP MODAL SAAT KLIK DI LUAR MODAL
        // ==========================================

        window.addEventListener(
            'click',
            function (event) {

                if (
                    modalLupa &&
                    event.target === modalLupa
                ) {

                    modalLupa.style.display = 'none';

                }


                if (
                    modalDaftar &&
                    event.target === modalDaftar
                ) {

                    modalDaftar.style.display = 'none';

                }

            }
        );

    }


    // ==========================================
    // 3. LOGIKA DASHBOARD (dashboard.html)
    // ==========================================

    const greetingText =
        document.getElementById('greeting-text');

    if (greetingText) {

        // ==========================================
        // PROFIL & GREETING
        // ==========================================

        const userLogin =
            JSON.parse(
                localStorage.getItem('userLogin')
            );

        const userInfo =
            document.getElementById('user-info');


        // Menentukan salam sesuai jam sistem

        const hour =
            new Date().getHours();

        let salam = 'Selamat Pagi';

        if (hour >= 11 && hour < 15) {

            salam = 'Selamat Siang';

        } else if (hour >= 15 && hour < 18) {

            salam = 'Selamat Sore';

        } else if (hour >= 18 || hour < 4) {

            salam = 'Selamat Malam';

        }


        // Menampilkan greeting

        if (userLogin) {

            greetingText.innerText =
                `${salam}, ${userLogin.nama}!`;


            if (userInfo) {

                userInfo.innerHTML = `
                    <p style="margin-bottom: 8px;">
                        <strong>Nama Lengkap:</strong> ${userLogin.nama}
                    </p>

                    <p style="margin-bottom: 8px;">
                        <strong>Email:</strong> ${userLogin.email}
                    </p>

                    <p style="margin-bottom: 8px;">
                        <strong>Peran (Role):</strong> ${userLogin.role}
                    </p>

                    <p style="margin-bottom: 8px;">
                        <strong>Lokasi Kerja:</strong> ${userLogin.lokasi}
                    </p>
                `;

            }

        } else {

            greetingText.innerText =
                `${salam}, Pengguna!`;


            if (userInfo) {

                userInfo.innerHTML = `
                    <p>
                        Silakan
                        <a href="index.html">login</a>
                        terlebih dahulu untuk melihat
                        informasi akun.
                    </p>
                `;

            }

        }


        // ==========================================
        // RINGKASAN DATA BAHAN AJAR
        // ==========================================

        const totalBahanAjar =
            document.getElementById(
                'total-bahan-ajar'
            );

        const totalStok =
            document.getElementById(
                'total-stok'
            );

        const totalDOProses =
            document.getElementById(
                'total-do-proses'
            );

        const totalDOSelesai =
            document.getElementById(
                'total-do-selesai'
            );


        // Pastikan data tersedia

        if (
            typeof dataBahanAjar !== 'undefined' &&
            Array.isArray(dataBahanAjar)
        ) {

            // Jumlah jenis bahan ajar

            if (totalBahanAjar) {

                totalBahanAjar.innerText =
                    dataBahanAjar.length;

            }


            // Total seluruh stok

            const jumlahStok =
                dataBahanAjar.reduce(
                    function (total, item) {

                        return total +
                            Number(item.stok || 0);

                    },
                    0
                );


            if (totalStok) {

                totalStok.innerText =
                    jumlahStok.toLocaleString('id-ID');

            }

        }


        // ==========================================
        // RINGKASAN DATA TRACKING
        // ==========================================

        if (
            typeof dataTracking !== 'undefined' &&
            dataTracking
        ) {

            const semuaDO =
                Object.values(dataTracking);


            // DO yang belum selesai

            const jumlahProses =
                semuaDO.filter(
                    function (item) {

                        return item.status !==
                            'Selesai Antar';

                    }
                ).length;


            // DO yang sudah selesai

            const jumlahSelesai =
                semuaDO.filter(
                    function (item) {

                        return item.status ===
                            'Selesai Antar';

                    }
                ).length;


            if (totalDOProses) {

                totalDOProses.innerText =
                    jumlahProses;

            }


            if (totalDOSelesai) {

                totalDOSelesai.innerText =
                    jumlahSelesai;

            }

        }


        // ==========================================
        // AKTIVITAS TERBARU
        // ==========================================

        const recentActivities =
            document.getElementById(
                'recent-activities'
            );


        if (
            recentActivities &&
            typeof dataTracking !== 'undefined'
        ) {

            const semuaDO =
                Object.values(dataTracking);


            // Urutkan berdasarkan tanggal terbaru

            semuaDO.sort(
                function (a, b) {

                    return new Date(b.tanggalKirim) -
                        new Date(a.tanggalKirim);

                }
            );


            // Bersihkan isi sebelumnya

            recentActivities.innerHTML = '';


            semuaDO.forEach(
                function (item) {

                    const activity =
                        document.createElement('div');


                    activity.className =
                        'activity-item';


                    let icon = '→';

                    if (
                        item.status ===
                        'Selesai Antar'
                    ) {

                        icon = '✓';

                    }


                    activity.innerHTML = `

                        <div class="activity-icon">
                            ${icon}
                        </div>

                        <div class="activity-content">

                            <div class="activity-title">
                                DO ${item.nomorDO}
                            </div>

                            <div class="activity-description">
                                Status:
                                <strong>${item.status}</strong>
                                <br>
                                Ekspedisi:
                                ${item.ekspedisi}
                                <br>
                                Penerima:
                                ${item.nama}
                            </div>

                            <div class="activity-date">
                                ${item.tanggalKirim}
                            </div>

                        </div>

                    `;


                    recentActivities.appendChild(
                        activity
                    );

                }
            );


            // Jika belum ada aktivitas

            if (semuaDO.length === 0) {

                recentActivities.innerHTML = `
                    <p>
                        Belum ada aktivitas terbaru.
                    </p>
                `;

            }

        }

    }


    // ==========================================
    // 4. LOGIKA TRACKING DO
    // (tracking.html)
    // ==========================================

    const formSearchDO =
        document.getElementById('form-search-do');

    if (formSearchDO) {

        formSearchDO.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();


                const noDO =
                    document
                        .getElementById('input-no-do')
                        .value
                        .trim();


                const hasilBox =
                    document.getElementById(
                        'hasil-tracking'
                    );


                const data =
                    dataTracking[noDO];


                if (data) {

                    document.getElementById(
                        'track-no-do'
                    ).innerText =
                        data.nomorDO;


                    document.getElementById(
                        'track-nama'
                    ).innerText =
                        data.nama;


                    document.getElementById(
                        'track-ekspedisi'
                    ).innerText =
                        data.ekspedisi;


                    document.getElementById(
                        'track-tanggal'
                    ).innerText =
                        data.tanggalKirim;


                    document.getElementById(
                        'track-paket'
                    ).innerText =
                        data.paket;


                    document.getElementById(
                        'track-total'
                    ).innerText =
                        data.total;


                    document.getElementById(
                        'track-status'
                    ).innerText =
                        data.status;


                    const timelineList =
                        document.getElementById(
                            'track-timeline'
                        );


                    timelineList.innerHTML = '';


                    data.perjalanan.forEach(
                        item => {

                            const li =
                                document.createElement(
                                    'li'
                                );

                            li.className =
                                'timeline-item';


                            li.innerHTML = `
                                <strong>
                                    ${item.waktu}
                                </strong>
                                <br>
                                ${item.keterangan}
                            `;


                            timelineList.appendChild(li);

                        }
                    );


                    hasilBox.style.display =
                        'block';

                }

                else {

                    alert(
                        'Nomor DO tidak ditemukan! Contoh Nomor DO yang valid: 2023001234 atau 2023005678'
                    );

                    hasilBox.style.display =
                        'none';

                }

            }
        );

    }



    // ==========================================
    // 5. LOGIKA INFORMASI BAHAN AJAR
    // ==========================================

    const tbodyStok =
        document.getElementById('tbody-stok');

    const stockCardList =
        document.getElementById('stock-card-list');


    // Pastikan data tersedia
    if (
        tbodyStok &&
        typeof dataBahanAjar !== 'undefined' &&
        Array.isArray(dataBahanAjar)
    ) {

        // ==========================================
        // RENDER TABEL + KARTU
        // ==========================================

        function renderTable() {

            // --------------------------------------
            // TABEL DESKTOP
            // --------------------------------------

            tbodyStok.innerHTML = '';


            dataBahanAjar.forEach(
                function (item, index) {

                    const tr =
                        document.createElement('tr');


                    tr.innerHTML = `

                        <td> ${index + 1} </td>

                        <td> ${item.kodeLokasi || '-'} </td>

                        <td> ${item.kodeBarang || '-'} </td>

                        <td> ${item.namaBarang || '-'} </td>

                        <td> ${item.jenisBarang || '-'} </td>

                        <td> ${item.edisi || '-'} </td>

                        <td>
                            <strong>
                                ${item.stok ?? 0}
                            </strong> </td>

                        <td style="text-align: center;">

                            <button
                                type="button"
                                class="stock-detail-btn"
                                onclick="lihatDetail(${index})"
                                title="Lihat Detail"
                            >
                                👁 Detail
                            </button>
                        </td>

                    `;


                    tbodyStok.appendChild(tr);

                }
            );


            // --------------------------------------
            // KARTU MOBILE
            // --------------------------------------

            if (stockCardList) {

                stockCardList.innerHTML = '';


                dataBahanAjar.forEach(
                    function (item, index) {

                        const card =
                            document.createElement('div');


                        card.className =
                            'stock-card';


                        card.innerHTML = `

                            <div class="stock-card-header">

                                <div>

                                    <div class="stock-card-title">
                                        ${item.namaBarang || '-'}
                                    </div>

                                    <div class="stock-card-code">
                                        ${item.kodeBarang || '-'}
                                    </div>

                                </div>

                            </div>


                            <div class="stock-card-info">

                                <div class="stock-card-info-item">

                                    <span class="stock-card-info-label">
                                        Kode Lokasi
                                    </span>

                                    <span class="stock-card-info-value">
                                        ${item.kodeLokasi || '-'}
                                    </span>

                                </div>


                                <div class="stock-card-info-item">

                                    <span class="stock-card-info-label">
                                        Jenis
                                    </span>

                                    <span class="stock-card-info-value">
                                        ${item.jenisBarang || '-'}
                                    </span>

                                </div>


                                <div class="stock-card-info-item">

                                    <span class="stock-card-info-label">
                                        Edisi
                                    </span>

                                    <span class="stock-card-info-value">
                                        ${item.edisi || '-'}
                                    </span>

                                </div>


                                <div class="stock-card-info-item">

                                    <span class="stock-card-info-label">
                                        Stok
                                    </span>

                                    <span class="stock-card-info-value stock-card-stock">
                                        ${item.stok ?? 0}
                                    </span>

                                </div>

                            </div>


                            <div class="stock-card-action">

                                <button
                                    type="button"
                                    class="stock-detail-btn"
                                    onclick="lihatDetail(${index})"
                                >
                                    👁 Detail
                                </button>

                            </div>

                        `;


                        stockCardList.appendChild(card);

                    }
                );

            }


            // --------------------------------------
            // RINGKASAN
            // --------------------------------------

            const totalJenis =
                document.getElementById(
                    'stock-total-jenis'
                );

            const totalStok =
                document.getElementById(
                    'stock-total-stok'
                );


            if (totalJenis) {

                totalJenis.innerText =
                    dataBahanAjar.length;

            }


            if (totalStok) {

                const jumlahStok =
                    dataBahanAjar.reduce(
                        function (total, item) {

                            return total +
                                Number(item.stok || 0);

                        },
                        0
                    );


                totalStok.innerText =
                    jumlahStok.toLocaleString('id-ID');

            }

        }


        // ==========================================
        // FUNGSI LIHAT DETAIL (GLOBAL SCOPE)
        // ==========================================

        window.lihatDetail = function (index) {

            const item = dataBahanAjar[index];

            if (!item) return;

            // Ambil elemen-elemen di modal detail
            const modalDetail = document.getElementById('modal-detail');
            const detailCover = document.getElementById('detail-cover');
            const detailKode = document.getElementById('detail-kode');
            const detailNama = document.getElementById('detail-nama');
            const detailJenis = document.getElementById('detail-jenis');
            const detailEdisi = document.getElementById('detail-edisi');
            const detailLokasi = document.getElementById('detail-lokasi');
            const detailStok = document.getElementById('detail-stok');

            // Isikan data ke elemen modal
            if (detailCover) detailCover.src = item.cover || 'assets/images.jpeg';
            if (detailKode) detailKode.innerText = item.kodeBarang || '-';
            if (detailNama) detailNama.innerText = item.namaBarang || '-';
            if (detailJenis) detailJenis.innerText = item.jenisBarang || '-';
            if (detailEdisi) detailEdisi.innerText = item.edisi || '-';
            if (detailLokasi) detailLokasi.innerText = item.kodeLokasi || '-';
            if (detailStok) detailStok.innerText = item.stok ?? 0;

            // Tampilkan modal
            if (modalDetail) {
                modalDetail.style.display = 'block';
            }

        };


        // ==========================================
        // TAMPILKAN DATA SAAT HALAMAN DIBUKA
        // ==========================================

        renderTable();


        // ==========================================
        // TAMBAH DATA
        // ==========================================

        const formTambahStok =
            document.getElementById(
                'form-tambah-stok'
            );


        if (formTambahStok) {

            formTambahStok.addEventListener(
                'submit',
                function (e) {

                    e.preventDefault();


                    const newItem = {

                        kodeLokasi:
                            document
                                .getElementById('add-lokasi')
                                .value
                                .trim(),

                        kodeBarang:
                            document
                                .getElementById('add-kode')
                                .value
                                .trim(),

                        namaBarang:
                            document
                                .getElementById('add-nama')
                                .value
                                .trim(),

                        jenisBarang:
                            document
                                .getElementById('add-jenis')
                                .value
                                .trim(),

                        edisi:
                            document
                                .getElementById('add-edisi')
                                .value
                                .trim(),

                        stok:
                            parseInt(
                                document
                                    .getElementById('add-stok')
                                    .value
                            ) || 0,

                        cover:
                            'assets/images.jpeg'

                    };


                    dataBahanAjar.push(
                        newItem
                    );


                    renderTable();


                    formTambahStok.reset();


                    const jenisInput =
                        document.getElementById(
                            'add-jenis'
                        );


                    if (jenisInput) {
                        jenisInput.value = 'BMP';
                    }


                    alert(
                        'Data bahan ajar berhasil ditambahkan!'
                    );

                }
            );

        }


        // ==========================================
        // MODAL DETAIL
        // ==========================================

        const modalDetail =
            document.getElementById(
                'modal-detail'
            );

        const closeDetail =
            document.getElementById(
                'close-detail'
            );

        const btnTutupDetail =
            document.getElementById(
                'btn-tutup-detail'
            );


        if (closeDetail && modalDetail) {

            closeDetail.onclick =
                function () {

                    modalDetail.style.display =
                        'none';

                };

        }


        if (btnTutupDetail && modalDetail) {

            btnTutupDetail.onclick =
                function () {

                    modalDetail.style.display =
                        'none';

                };

        }


        window.addEventListener(
            'click',
            function (event) {

                if (
                    modalDetail &&
                    event.target === modalDetail
                ) {

                    modalDetail.style.display =
                        'none';

                }

            }
        );

    }
    else {

        console.error(
            'Data bahan ajar tidak tersedia. Pastikan data.js dimuat sebelum script.js.'
        );

    }
});