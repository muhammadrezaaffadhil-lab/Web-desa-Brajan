/**
 * SCRIPT WEBSITE KARANGDUKUH
 * FIXED VERSION
 */

// ===== COUNTER =====
function jalankanKonter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    let nilai = 0;
    let speed = target / 100;

    let timer = setInterval(() => {
        nilai += Math.ceil(speed);

        if (nilai >= target) {
            el.innerText = target.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            el.innerText = nilai.toLocaleString('id-ID');
        }
    }, 30);
}

// ===== FILTER UMKM =====
function filterProduk(kategori, btn) {
    document.querySelectorAll('.filter-btn')
        .forEach(b => b.classList.remove('active'));

    if (btn) btn.classList.add('active');

    document.querySelectorAll('#produk-grid .card')
        .forEach(item => {
            const match = kategori === 'semua' ||
                item.dataset.kategori === kategori;

            item.style.display = match ? 'block' : 'none';
        });
}

// ===== DOWNLOAD GAMBAR =====
function unduhGambar(id, namaFile) {
    const img = document.getElementById(id);
    if (!img) return;

    fetch(img.src)
        .then(res => res.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = namaFile;
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch(() => alert("Gagal download gambar"));
}

// ===== MODAL GAMBAR FULLSCREEN =====
function openImage(src) {
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("modalImg");

    modal.style.display = "block";
    img.src = src;
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('counter-penduduk')) {
        jalankanKonter('counter-penduduk', 4520);
    }
});
