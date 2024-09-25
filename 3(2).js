function invertedPyramid(rows) {
    let result = ""; // Inisialisasi string hasil
  
    for (let i = 0; i < rows; i++) {
      // Tambahkan spasi di awal untuk membentuk piramida sama kaki
      for (let spasi = 0; spasi < i; spasi++) {
        result += " "; // Menambahkan spasi di awal setiap baris
      }
  
      // Baris ganjil: index 0 dan 2 menampilkan pola # + #
      if (i % 2 === 0) {
        for (let j = 0; j < rows - i; j++) {

          if (i === 0) {
            result += (j % 2 === 0 ? "#" : "+"); // Baris pertama: # + # + #  
          } else if (i === 2) {
            result += (j % 2 === 0 ? "+" : "#"); // Baris ketiga: + # +
          } else {
            result += (j % 2 === 0 ? "#" : " "); // Baris kelima: #
          }
  
          if (j < rows - i - 1) {
            result += " "; // Menambahkan spasi antar karakter
          }
        }
      }
      // Baris genap: index 1 dan 3 hanya diisi dengan +
      else {
        for (let j = 0; j < rows - i; j++) {
          result += "+"; // Menampilkan +
          
          if (j < rows - i - 1) {
            result += " "; // Menambahkan spasi antar karakter
          }
        }
      }
  
      // Tambahkan baris baru
      result += "\n";
    }
  
    return result;
  }
  
  // Mendeklarasikan tinggi piramida
  const height = 5;
  console.log(invertedPyramid(height));
  