Aktor
● Tamu: hanya bisa melihat katalog buku (Beranda, Daftar Buku) tanpa login.
● Petugas: login untuk mengakses seluruh fitur CRUD dan transaksi peminjaman.

User Flow - Peminjaman Buku
[Petugas Login] -> [Dashboard] -> [Pilih menu "Peminjaman Baru"]
        -> [Pilih Anggota] -> [Pilih Buku (stok > 0)]
        -> [Simpan] -> [Stok buku berkurang 1] -> [Kembali ke Dashboard]

User Flow - Pengembalian Buku
[Dashboard] -> [Menu "Pengembalian"] -> [Cari transaksi aktif (anggota/buku)]
        -> [Tandai "Dikembalikan"] -> [Stok buku bertambah 1]
        -> [Kembali ke Dashboard]

User Flow - Mencari Anggota dengan Tunggakan Jatuh Tempo
[Petugas Login] -> [Dashboard] -> [Menu "Anggota"]
        -> [Pilih filter "Tunggakan Jatuh Tempo"]
        -> <Ada anggota yang menunggak?>
        -> Tidak: [Tampilkan "Tidak ada tunggakan"]
        -> Ya: [Tampilkan daftar anggota menunggak]
        -> [Pilih anggota]
        -> [Lihat detail buku, tanggal pinjam, dan jatuh tempo]
        -> [Hubungi/Ingatkan anggota]
        -> [Kembali ke Daftar Tunggakan]

Wireframe: Halaman Login
+--------------------------------------+
|              SIMPUS-Mini             |
|--------------------------------------|
|                                      |
|        [ Login Petugas ]             |
|                                      |
|   Username : [______________]        |
|   Password : [______________]        |
|                                      |
|          [   Masuk   ]               |
|                                      |
|   Belum punya akun? Daftar di sini   |
+--------------------------------------+

Wireframe: Dashboard Petugas
+-----------------------------------------------------+
| SIMPUS-Mini      Beranda | Buku | Anggota | Peminjaman | (Nama Petugas) Logout |
|-------------------------------------------------------|
|  [Total Buku]   [Total Anggota]   [Sedang Dipinjam]    |
|                                                         |
|  Aksi Cepat:                                           |
|  [ + Peminjaman Baru ]   [ + Pengembalian ]            |
|                                                         |
|  Transaksi Terbaru                                     |
|  --------------------------------------------------    |
|  Anggota | Buku | Tgl Pinjam | Status                  |
+-----------------------------------------------------+

Wireframe: Form Peminjaman
+--------------------------------------+
|  Form Peminjaman Buku                |
|--------------------------------------|
|  Anggota : [ dropdown pilih anggota ]|
|  Buku    : [ dropdown, hanya stok>0 ]|
|  Tanggal Pinjam : [ auto: hari ini ] |
|                                      |
|          [  Simpan Peminjaman  ]     |
+--------------------------------------+

Wireframe: Form Pengembalian
+--------------------------------------+
|  Pengembalian Buku                   |
|--------------------------------------|
|  Cari transaksi aktif:               |
|  [ nama anggota / judul buku ______ ]|
|                                      |
|  Anggota | Buku | Tgl Pinjam | [Kembalikan] |
+--------------------------------------+

Wireframe: Riwayat Peminjaman per Anggota
+--------------------------------------+
|  Riwayat Peminjaman — Siti Aminah    |
|--------------------------------------|
|  Buku            | Pinjam   | Kembali | Status      |
|  Laskar Pelangi   | 01/07    | 10/07   | Selesai     |
|  Bumi Manusia      | 15/07    | -       | Dipinjam    |
+--------------------------------------+

Wireframe: Registrasi Anggota Baru
+--------------------------------------+
|       Registrasi Anggota Baru        |
|--------------------------------------|
| Nama Lengkap : [__________________]  |
| Email        : [__________________]  |
| No. Telepon  : [__________________]  |
| Alamat       : [__________________]  |
| Username     : [__________________]  |
| Password     : [__________________]  |
|                                      |
|          [    Daftar    ]            |
|                                      |
| Sudah punya akun? Masuk di sini      |
+--------------------------------------+

Edge Case Tambahan
● Anggota tidak boleh meminjam buku yang sama dua kali jika peminjaman pertama masih aktif; sistem menampilkan peringatan dan tidak menyimpan transaksi kedua.
● Peminjaman tidak dapat dilakukan jika anggota masih memiliki tunggakan yang melewati jatuh tempo; petugas harus menyelesaikan atau menindaklanjuti tunggakan terlebih dahulu.
● Registrasi ditolak jika username atau email sudah digunakan oleh anggota lain.

Konsistensi dengan Desain yang Sudah Berjalan
● Warna aksen, tipografi navbar, dan gaya tabel/kartu mengikuti assets/css/style.css yang sudah dibangun sejak Jobsheet 2-3.
● Navbar akan ditambah menu Peminjaman dan indikator status login (nama petugas / tombol Logout) mulai implementasi di Jobsheet 10.
● Edge case yang perlu ditangani saat implementasi: buku stok habis tidak boleh dipilih di form peminjaman; anggota dengan tunggakan terlambat divalidasi di Jobsheet 12 (tugas mandiri).

