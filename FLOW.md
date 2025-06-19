# 📘 Application Flow Documentation

Dokumentasi ini menjelaskan alur utama dari aplikasi **MyApp** agar developer dan user memahami proses bisnis serta interaksi antar komponen di dalamnya.

---

## 🏁 1. Alur Registrations

1. User melakukan registrasi membuka di page registration (`/admin/staff/registerogin`)
2. Ketika user telah berhasil melakukan registrasi maka user akan mendapatkan thanks email dari email Event-STT karena telah melakukan registrasi namun user masih di tahap pending status
3. Ketika user telah di confirm oleh admin dari Event-STT maka user akan mendapakan email confirmation registrations dan qr-code/barcode (e-tiket kehadiran)

## 🏁 2. Alur Absensi

1. User harus datang di hari-h event dan jika mau masuk kedalam event harus menunjukkan qr-code/barcode yang telah diberikan di email masing - masing user
2. Admin Event-STT akan melakukan scan barcode untuk masing masing user yang menentukan apakah user benar sudah terdaftar dalam system/registrasi
3. System akan mengubah status kehadiran menjadi hadir


## 🏁 3. Alur Booth

1. User sudah diberikan qr-code/barcode masing masing di email registration, ini harus digunakan untuk melakukan check-in untuk setiap booth yang ada
2. Ketika sudah check-in maka data user akan di simpan kedalam system event-ss

## 🏁 4. Alur Review/Feedback

1. Setiap booth akan menyedian qr-code masing masing untuk para participant(user)event jika ingin melakukan feedback terhadap booth bisa melalui feedback ini
2. Ketika user melakukan scan ke qr-code ini akan di arahkan ke link event-stt

## 🏁 5. Alur Spin Wheel

1. Participant yang berhak mengikuti spin wheel atau draw prize ialah participan yang eligible telah mengikuti seluruh aturan yang dibuat oleh event-stt
2. peraturannya adalah pertama harus berstatus hadir di status kehadiran system, melakukakan check-in disetiap booth yang telah di sediakan oleh event-stt jika sudah memenuhi syarat maka data participant akan otomatis masuk kedalam system event-stt untuk spin wheel/draw prize
3. jika participant yang telah terpilih mendapatkan hadiah maka data participant akan hilang dati spin wheel/draw prize dengan melakukan refresh data participant 

---

## 📩 Penutup

Dokumentasi ini disusun untuk membantu Anda memahami alur aplikasi **Event-STT**, mulai dari registrasi peserta, proses absensi, kunjungan booth, pengisian feedback, hingga mekanisme undian hadiah (spin wheel).

Terima kasih telah menggunakan aplikasi Event-STT.  
Semoga dokumentasi ini bermanfaat dan dapat mempermudah kolaborasi ke depannya. 🎉