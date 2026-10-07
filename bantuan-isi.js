window.OCTO_BANTUAN = {
  app: 'Gudang Material',
  intro: 'Urutan kerja: daftarkan material, buat proyek dan WBS, catat barang masuk dan keluar, lalu pantau stok dan pemakaian di Dashboard.',
  langkah: [
    ['Masuk dengan akun Google', 'Aplikasi meminta login Google lebih dulu. Setelah masuk, sesi bertahan sekitar 7 hari di perangkat yang sama.'],
    ['Pahami data contoh', 'Saat pertama dibuka, Dashboard menampilkan data contoh. Klik "Hapus data contoh" bila ingin mulai dari data Anda sendiri.'],
    ['Tambah material', 'Buka tab "Stok", klik "+ Material", lalu isi kode, nama, satuan, kategori, lokasi rak, stok minimum, harga satuan, dan stok awal.'],
    ['Buat proyek', 'Buka tab "Proyek & WBS" atau klik "+ Proyek" di Dashboard. Isi nama, lokasi, tanggal, dan "Anggaran material (Rp)".'],
    ['Susun WBS', 'Pada kartu proyek klik "+ WBS", isi "WBS id" dan "Nama pekerjaan", lalu tambahkan kebutuhan material rencana lewat "+ Tambah material".'],
    ['Catat barang masuk', 'Klik "+ Catat transaksi" atau tombol "Masuk" pada material. Isi jumlah, pemasok, no. surat jalan, dan harga satuan, lalu "Simpan".'],
    ['Catat barang keluar', 'Pilih "Barang keluar", tentukan "Proyek tujuan" dan "Pekerjaan (WBS id)", isi penerima atau mandor dan no. bon, lalu "Simpan".'],
    ['Cocokkan stok fisik', 'Setelah menghitung di gudang, pilih "Opname" dan isi "Jumlah fisik hasil hitung". Selisih dicatat sebagai transaksi agar riwayatnya terlihat.'],
    ['Pantau Dashboard', 'Lihat "Perlu dipesan", stok yang kurang untuk sisa rencana WBS, dan "Pemakaian melebihi rencana". Klik "Terima barang" untuk langsung mencatat penerimaan.'],
    ['Tautkan model BIM (opsional)', 'Di kartu proyek klik "Impor model IFC", pilih berkas IFC, lalu "Terapkan ke proyek". Hasil per WBS bisa dibawa ke Excel lewat "Salin CSV per WBS".']
  ],
  panduan: [
    ['Dashboard', [
      ['Kartu ringkasan', 'Menampilkan "Proyek berjalan", "Perlu dipesan", "Nilai persediaan", "Keluar 7 hari", dan "Transaksi hari ini".'],
      ['Proyek berjalan', 'Tiap kartu menunjukkan material terpakai dibanding rencana WBS dan anggaran material. Klik kartu untuk membuka proyeknya.'],
      ['Arus material 7 hari', 'Grafik nilai rupiah barang masuk dan keluar selama 7 hari terakhir.'],
      ['Perlu dipesan', 'Daftar material yang menipis atau habis. Garis tegak pada batang menandai stok minimum.'],
      ['Pemakaian melebihi rencana', 'Tabel WBS yang pemakaian materialnya melewati kebutuhan rencana.'],
      ['Aktivitas terbaru', 'Enam transaksi terakhir. "Semua transaksi" membuka tab "Transaksi".']
    ]],
    ['Stok', [
      ['Pencarian', 'Kolom "Cari kode, nama, atau rak" menyaring daftar material.'],
      ['Filter status', 'Pilih "Semua", "Perlu dipesan", atau "Habis". Status tiap material: Aman, Menipis, Habis.'],
      ['Filter kategori dan proyek', 'Dropdown kategori dan "Semua proyek" mempersempit daftar stok.'],
      ['+ Material', 'Menambah material baru. Kode otomatis diisi berurutan dan bisa diubah.'],
      ['Masuk / Keluar', 'Tombol pada tiap baris material untuk langsung mencatat transaksi barang tersebut.'],
      ['Kartu stok', 'Klik nama material untuk melihat riwayatnya. Dari sini tersedia "Ubah" untuk mengedit data material.'],
      ['Koreksi jumlah stok', 'Jumlah stok tidak diubah lewat edit material. Gunakan transaksi "Opname".']
    ]],
    ['Transaksi', [
      ['Barang masuk', 'Isi material, jumlah, tanggal, pemasok, no. surat jalan, dan harga satuan.'],
      ['Barang keluar', 'Isi proyek tujuan, "Pekerjaan (WBS id)", penerima atau mandor, dan no. bon pemakaian.'],
      ['Opname', 'Isi "Jumlah fisik hasil hitung" untuk menyamakan stok sistem dengan stok di rak.'],
      ['Dicatat oleh', 'Nama petugas diingat di perangkat ini sehingga tidak perlu diketik ulang.'],
      ['Filter riwayat', 'Pilih "Semua", "Masuk", "Keluar", atau "Opname", dan saring per proyek. "Tampilkan lebih banyak" memuat riwayat yang lebih lama.'],
      ['Batalkan', 'Tombol pada baris transaksi untuk membatalkannya setelah konfirmasi "Ya, batalkan".']
    ]],
    ['Proyek & WBS', [
      ['+ Proyek / Ubah proyek', 'Isi kode, status, nama, lokasi, klien, penanggung jawab lapangan, tanggal mulai dan target selesai, serta anggaran material.'],
      ['+ WBS / Ubah WBS', 'WBS berisi "WBS id", "Nama pekerjaan", dan kebutuhan material rencana. "Hapus WBS" meminta konfirmasi; transaksi lama tetap tersimpan.'],
      ['Catat barang keluar', 'Tombol pada tiap WBS untuk mencatat pemakaian material ke pekerjaan tersebut.'],
      ['Impor model IFC', 'Membaca berkas IFC di perangkat Anda tanpa mengunggahnya. Elemen dikelompokkan menurut properti WBS, lalu dicocokkan dengan "WBS id" proyek.'],
      ['Coba dengan IFC contoh', 'Mencoba alur impor tanpa berkas sendiri.'],
      ['Salin CSV per WBS', 'Menampilkan CSV dengan kolom WBS_ID sebagai kunci. Klik "Salin" lalu tempel ke Excel atau tabel kuantitas BIM.']
    ]],
    ['Data dan penyimpanan', [
      ['Tempat data', 'Data disimpan di browser perangkat ini (localStorage). Membersihkan data situs akan menghapusnya, dan data tidak otomatis pindah ke perangkat lain.'],
      ['Hapus data contoh', 'Menghapus hanya data bertanda contoh. Data yang Anda tambahkan tetap ada.'],
      ['Login Google', 'Login hanya mengatur akses ke aplikasi dan mencatat kunjungan, tidak menyimpan data gudang.']
    ]]
  ],
  pintasan: [
    ['Esc', 'Menutup jendela isian yang sedang terbuka']
  ],
  bagian: ['Umum', 'Dashboard', 'Stok', 'Transaksi', 'Proyek & WBS', 'Impor IFC / CSV', 'Login dan data']
};
