function invertedPyramid(rows) {
    let result = ""; // Inisialisasi string hasil

    for (let i = 0; i < rows; i++) {
        // Tambahkan spasi di awal baris
        for (let spasi = 0; spasi < i; spasi++) {
            result += " ";
        }

        // Baris ganjil diisi dengan # dan +
        if (i % 2 === 0) {
            for (let j = 0; j < (rows - i); j++) {
                result += (j % 2 === 0) ? "#" : "+"; // Ganjil: #, Genap: +


                if (j < (rows - i - 1)) {
                    result += " "; // Menambahkan spasi
                }
            }
        } 
        // Baris genap hanya diisi dengan +
        else {
            result += "+ ".repeat(rows - i); // Menampilkan + sebanyak sisa baris yang tersisa
        }

        // Membuat baris baru
        result += "\n";
    }

    return result;
}

// Mendeklarasikan tinggi piramida
const height = 5;
console.log(invertedPyramid(height));
