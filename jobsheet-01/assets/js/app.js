// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;
    toggleBtn.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("nav-open");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====
function initHapusConfirm() {
    const table = document.querySelector(".table-responsive table");
    perbaruiCounterBaris(table);
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td")?.textContent : "data ini";
            const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
            if (yakin && row) {
                row.remove();
                perbaruiCounterBaris(table);
            }
        });
    });
}

// ===== Filter/pencarian tabel real-time =====
function perbaruiCounterBaris(table) {
    if (!table) return;
    const section = table.closest("section");
    const tableWrapper = table.closest(".table-responsive");
    if (!section || !tableWrapper) return;

    let counter = section.querySelector(".table-count");
    if (!counter) {
        counter = document.createElement("p");
        counter.className = "table-count";
        counter.setAttribute("aria-live", "polite");
        tableWrapper.parentNode.insertBefore(counter, tableWrapper);
    }

    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const rowsShown = rows.filter(function (row) {
        return row.style.display !== "none";
    }).length;
    const firstHeader = table.querySelector("thead th");
    const label = firstHeader && firstHeader.textContent.toLowerCase().includes("anggota")
        ? "anggota"
        : "buku";
    counter.textContent = "Menampilkan " + rowsShown + " dari " + rows.length + " " + label;
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;
    perbaruiCounterBaris(table);
    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const kolomPencarian = row.querySelector("td");
            const teks = kolomPencarian ? kolomPencarian.textContent.toLowerCase() : "";
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
        perbaruiCounterBaris(table);
    });
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}
function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}
function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;
    const aturanValidasi = [
        {
            selector: "[name='judul'], [name='nama']",
            cek: (el) => el.value.trim() !== "",
            pesan: "Field ini wajib diisi."
        },
        {
            selector: "[name='pengarang']",
            cek: (el) => el.value.trim() !== "",
            pesan: "Pengarang wajib diisi."
        },
        {
            selector: "[name='tahun']",
            cek: (el) => {
                const val = parseInt(el.value, 10);
                return !isNaN(val) && val >= 1900 && val <= 2026;
            },
            pesan: "Tahun harus di antara 1900-2026."
        },
        {
            selector: "[name='stok']",
            cek: (el) => {
                const val = parseInt(el.value, 10);
                return !isNaN(val) && val >= 0;
            },
            pesan: "Stok tidak boleh bernilai negatif."
        },
        {
            selector: "[name='isbn']",
            cek: (el) => el.value.trim() === "" || /^[0-9-]+$/.test(el.value.trim()),
            pesan: "ISBN hanya boleh berisi angka dan tanda hubung."
        }
    ];

    form.addEventListener("submit", function (e) {
        let valid = true;

        aturanValidasi.forEach(function (rule) {
            const input = form.querySelector(rule.selector);
            if (!input) return;

            if (!rule.cek(input)) {
                tampilkanError(input, rule.pesan);
                valid = false;
            } else {
                hapusError(input);
            }
        });

        if (!valid) {
            e.preventDefault();
        }
    });
}

// ...fungsi init lain...
document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
