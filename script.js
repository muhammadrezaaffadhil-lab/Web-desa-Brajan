/**
 * WEBSITE KELURAHAN KARANGDUKUH - LOGIKA JAVASCRIPT GLOBAL
 * Bebas Eror & Ringan (Vanilla JS)
 */

// --- 1. ANIMASI COUNTER ANGKA (Halaman Beranda) ---
function jalankanKonter(id, target) {
    const elemen = document.getElementById(id);
    if (!elemen) return; // Mencegah eror jika elemen tidak ditemukan di halaman lain

    let hitung = 0;
    let kecepatan = target / 100;
    
    let updateKonter = setInterval(() => {
        hitung += Math.ceil(kecepatan);
        if (hitung >= target) {
            elemen.innerText = target.toLocaleString('id-ID');
            clearInterval(updateKonter);
        } else {
            elemen.innerText = hitung.toLocaleString('id-ID');
        }
    }, 30);
}

// --- 2. FILTER KATEGORI PRODUK (Halaman UMKM) ---
function filterProduk(kategori, elemen) {
    // Ubah status aktif pada tombol filter
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (elemen) {
        elemen.classList.add('active');
    }

    // Menyaring kartu item
    const kartu = document.querySelectorAll('#produk-grid .card');
    kartu.forEach(item => {
        if (kategori === 'semua' || item.getAttribute('data-kategori') === kategori) {
            item.style.display = 'block';
            // Reset dan jalankan ulang animasi masuk (fade in)
            item.style.animation = 'none';
            item.offsetHeight; 
            item.style.animation = 'fadeInUpCard 0.5s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// --- 3. LOGIKA DOWNLOAD GAMBAR BERKUALITAS (Halaman Kegiatan & UMKM) ---
function unduhGambar(idElemenGambar, namaFile) {
    const img = document.getElementById(idElemenGambar);
    if (!img) return;

    // Menggunakan fetch blob agar aman dari pembatasan cross-origin browser
    fetch(img.src)
        .then(response => {
            if (!response.ok) throw new Error('Jaringan bermasalah');
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = namaFile;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(() => alert('Gagal mengunduh gambar. Pastikan gambar sudah termuat sempurna atau ganti dengan file lokal.'));
}

// --- 4. EVENT LISTENER SAAT HALAMAN DIMUAT (Inisialisasi) ---
document.addEventListener("DOMContentLoaded", () => {
    // Otomatis jalankan konter jika pengguna berada di Beranda (index.html)
    if (document.getElementById('counter-penduduk')) {
        jalankanKonter('counter-penduduk', 4520);
    }
});