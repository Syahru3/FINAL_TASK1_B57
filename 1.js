function totalInvestasi2Tahun() {
  // Pembagian modal investasi
  const depotsit = 350_000_000; // Deposit Bank
  const sisaDepotsit = 650_000_000; // Sisa dari 1M

  const obligasi = 0.3 * sisaDepotsit;
  const sahamA = 0.35 * sisaDepotsit; // Saham A (35%)
  const sahamB = sisaDepotsit - (obligasi + sahamA); // Saham B (sisa)

  // Tingkat keuntungan per tahun
  const presenteaseDeposit = 0.035; // 3.5%
  const presentaseObligasi = 0.13; // 13%
  const presentaseSahamA = 0.145; // 14.5%
  const presentaseSahamB = 0.125; // 12.5%

  // Hitung total uang setelah 2 tahun
  const totalDeposit = depotsit * Math.pow(1 + presenteaseDeposit, 2);
  const totalObligasi = obligasi * Math.pow(1 + presentaseObligasi, 2);
  const totalSahamA = sahamA * Math.pow(1 + presentaseSahamA, 2);
  const totalSahamB = sahamB * Math.pow(1 + presentaseSahamB, 2);

  // Jumlahkan semua total investasi
  const totalInvestment =
    totalDeposit + totalObligasi + totalSahamA + totalSahamB;

  return totalInvestment;
}

// Modal awal
const totalNilaiInvestasi = totalInvestasi2Tahun(); //(?)

// Tampilkan hasil
console.log(
  `Total uang investor setelah dua tahun adalah: Rp ${totalNilaiInvestasi.toLocaleString()}`
);
