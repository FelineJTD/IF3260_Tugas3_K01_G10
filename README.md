# **IF3260_Tugas3_K01_G19 WebGL Articulated Model**

Program ini merupakan aplikasi WebGL yang menampilkan articulated model. Pengguna juga dapat mengatur warna, metode proyeksi, pengaturan transformasi objek, mengubah texture, serta menggerakkan komponen dari model.

## **Running the Program**

### **Requirements**

- Python
- Module http.server python

### **How to Run**

1. Buka terminal di direktori program.
2. Jalankan perintah `python http.server 3260` untuk menjalankan server.
3. Buka browser dan ketikkan `localhost:3260/src/` di _address bar_.

## **Functionality**

### **Model**

Pengguna dapat memilih articulated model yang ingin ditampilkan dengan memilih salah satu dari model berikut:

- Dog
- Person
- Duck
- Platypus

### **Color**

Pengguna dapat memilih warna objek dengan memilih warna dari _color picker_.

### **Projection Method**

Pengguna dapat memilih salah satu dari metode proyeksi berikut untuk objek:

- Orthographic
- Oblique
- Perspective

### **Rotation, Translation, and Scaling**

Pengguna dapat memilih komponen yang ingin diatur dengan menekan tombol pada component tree.
Pengguna dapat mengatur pengaturan berikut untuk mentransformasi objek:

- RotationX: Memutar objek sekitar sumbu x.
- RotationY: Memutar objek sekitar sumbu y.
- RotationZ: Memutar objek sekitar sumbu z.
- TranslationX: Memindahkan objek sepanjang sumbu x.
- TranslationY: Memindahkan objek sepanjang sumbu y.
- TranslationZ: Memindahkan objek sepanjang sumbu z.
- ScalingX: Menyusut atau memperbesar objek sepanjang sumbu x.
- ScalingY: Menyusut atau memperbesar objek sepanjang sumbu y.
- ScalingZ: Menyusut atau memperbesar objek sepanjang sumbu z.

Pengguna dapat mengatur setiap pengaturan dengan menggeser _slider_ yang sesuai. Nilai saat ini dari setiap pengaturan ditampilkan di sebelah _slider_.

### **Camera**

Pengguna dapat mengatur radius dan _angle_ dari camer dengan menggeser _slider_ berikut:

- Radius: Jarak dari titik pusat objek ke kamera.
- Angle: Sudut antara sumbu z dan vektor dari titik pusat objek ke kamera.

### **Texture**

Pengguna dapat mengubah texture objek dengan memilih salah satu dari texture berikut:

- None
- Image

### **Save and Load Model**

Pengguna dapat memuat model khusus dalam format JSON dengan mengklik tombol Load Model dan memilih file. File harus memiliki ekstensi `.json`. Setelah di-_load_, model khusus akan menggantikan _checkboxes_ model yang dipilih. Selain itu, pengguna juga bisa melakukan Save Model dengan mengklik tombol Save Model untuk menyimpan _state_ dari program.
