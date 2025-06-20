## 🌐 Daftar Rute Halaman Aplikasi

Dokumentasi ini menjelaskan setiap endpoint (URL path) dalam aplikasi **Event-STT**, termasuk nama rute dan tujuan penggunaannya.

---

### `/` – **Index**

- **Nama Rute:** `Index`
- **Deskripsi:** Halaman utama aplikasi (landing page). Berisi informasi umum dan informasi event-stt.
- **Akses:** Semua pengguna

---

### `/admin/spinwheel` – **PrizeDrawEntries**

- **Nama Rute:** `PrizeDrawEntries`
- **Deskripsi:** Halaman untuk menampilkan dan mengelola daftar peserta undian hadiah (spin wheel).
- **Fungsi:** 
  - Menampilkan peserta yang eligible untuk diundi
  - Menjalankan proses undian hadiah
- **Akses:** Admin Event-STT

---

### `/admin/staff/register` – **StaffScanQR**

- **Nama Rute:** `StaffScanQR`
- **Deskripsi:** Halaman registrasi atau verifikasi kedatangan peserta oleh panitia/event staff melalui QR/barcode scan.
- **Fungsi:**
  - Melakukan pemindaian QR-code saat peserta datang
  - Mengubah status peserta menjadi *Hadir*
- **Akses:** Event Staff / Admin

---

### `/admin/staff/booth_visit` – **BoothVisit**

- **Nama Rute:** `BoothVisit`
- **Deskripsi:** Halaman untuk memindai QR-code saat peserta mengunjungi booth.
- **Fungsi:**
  - Mencatat kunjungan peserta ke booth tertentu
  - Menyimpan data ke sistem sebagai bagian dari syarat eligibility spin wheel
- **Akses:** Event Staff / Booth PIC

---

## 📝 Catatan

- Semua URL di atas diakses melalui antarmuka admin/staff dan membutuhkan autentikasi.
- Pastikan QR-code yang digunakan peserta sesuai dengan token yang di-generate saat registrasi.
- Hak akses perlu diatur untuk membatasi fitur sesuai peran (admin/staff/booth PIC).


# 📘 Application Flow Documentation

Dokumentasi ini menjelaskan alur utama dari aplikasi **Event-STT** agar developer dan participant(user) memahami proses bisnis serta interaksi antar komponen di dalamnya.

---

## 🏁 1. Alur Registrations

1. Participant event melakukan registrasi membuka di page registration (`/admin/staff/registerogin`)
2. Ketika participant telah berhasil melakukan registrasi maka participant akan mendapatkan thanks email dari email Event-STT karena telah melakukan registrasi namun participant masih di tahap pending status
3. Ketika participant telah di confirm oleh admin dari Event-STT maka participant akan mendapakan email confirmation registrations dan qr-code/barcode (e-tiket kehadiran)

## 🏁 2. Alur Absensi

1. Participant harus datang di hari-h event dan jika mau masuk kedalam event harus menunjukkan qr-code/barcode yang telah diberikan di email masing - masing participant
2. Admin Event-STT akan melakukan scan barcode untuk masing masing participant yang menentukan apakah participant benar sudah terdaftar dalam system/registrasi
3. System akan mengubah status kehadiran menjadi hadir


## 🏁 3. Alur Booth

1. Participants sudah diberikan qr-code/barcode masing masing di email registration, ini harus digunakan untuk melakukan check-in untuk setiap booth yang ada
2. Ketika sudah check-in maka data participant akan di simpan kedalam system event-ss

## 🏁 4. Alur Review/Feedback

1. Setiap booth akan menyedian qr-code masing masing untuk para participant event jika ingin melakukan feedback terhadap booth bisa melalui feedback ini
2. Ketika participant event melakukan scan ke qr-code ini akan di arahkan ke link event-stt

## 🏁 5. Alur Spin Wheel

1. Participant event yang berhak mengikuti spin wheel atau draw prize ialah participant yang eligible telah mengikuti seluruh aturan yang dibuat oleh event-stt
2. peraturannya adalah pertama harus berstatus hadir di status kehadiran system, melakukakan check-in disetiap booth yang telah di sediakan oleh event-stt jika sudah memenuhi syarat maka data participant akan otomatis masuk kedalam system event-stt untuk spin wheel/draw prize
3. jika participant yang telah terpilih mendapatkan hadiah maka data participant akan hilang dati spin wheel/draw prize dengan melakukan refresh data participant 

---

## 📩 Penutup

Dokumentasi ini disusun untuk membantu Anda memahami alur aplikasi **Event-STT**, mulai dari registrasi peserta, proses absensi, kunjungan booth, pengisian feedback, hingga mekanisme undian hadiah (spin wheel).

Terima kasih telah menggunakan aplikasi Event-STT.  
Semoga dokumentasi ini bermanfaat dan dapat mempermudah kolaborasi ke depannya. 🎉