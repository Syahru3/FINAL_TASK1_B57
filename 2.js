let arr = ["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "];
let target = ["D", "u", "m", "b", "w", "a", "y", "s", " ", "i", "s", " ", "a", "w", "e", "s", "o", "m", "e"];

let result = [];

// Loop through each character in the target array and match it with the characters in arr
target.forEach(char => {
  // Find the first matching character in arr and remove it
  let index = arr.indexOf(char); //menemukan karakter yang sesuai berdasarkan index
  if (index !== -1) { // memeriksa apakah suatu elemen ditemukan di dalam array
    result.push(arr.splice(index, 1)[0]); //menghapus elemen dari array arr berdasarkan indeks
  }
});

console.log(result.join(""));  // Output: "Dumbways is awesome"
