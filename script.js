function formatRupiah(x) {
  return "Rp " + Math.round(x).toLocaleString("id-ID");
}

function hitung() {

  console.log("SCRIPT JALAN"); // DEBUG CEK

  const hasilDiv = document.getElementById("hasil");
  const luas = document.getElementById("luas").value;
  const komoditas = document.getElementById("komoditas").value;

  if (!luas || luas <= 0) {
    hasilDiv.innerHTML = "ISI LUAS DULU";
    return;
  }

  if (!database || !database[komoditas]) {
    hasilDiv.innerHTML = "DATABASE ERROR";
    return;
  }

  const d = database[komoditas];

  const faktor = parseFloat(luas) / d.luasPatokan;

  // PER MUSIM
  const upah = d.upah * faktor;
  const produksi = d.produksi * faktor;
  const operasional = d.operasional * faktor;
  const nonOp = d.nonOperasional * faktor;

  const biayaMusim = upah + produksi + operasional + nonOp;

  const hasilMusim = d.hasilPanen * faktor;
  const pendapatanMusim = hasilMusim * d.harga;

  const profitMusim = pendapatanMusim - biayaMusim;

  // PER TAHUN
  const panen = d.panenTahun;

  const biayaTahun = biayaMusim * panen;
  const pendapatanTahun = pendapatanMusim * panen;
  const profitTahun = profitMusim * panen;

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <h3>🌾 PER MUSIM</h3>
    <p>Biaya: ${formatRupiah(biayaMusim)}</p>
    <p>Pendapatan: ${formatRupiah(pendapatanMusim)}</p>
    <p>Profit: ${formatRupiah(profitMusim)}</p>

    <hr>

    <h3>📅 PER TAHUN (${panen}x panen)</h3>
    <p>Biaya: ${formatRupiah(biayaTahun)}</p>
    <p>Pendapatan: ${formatRupiah(pendapatanTahun)}</p>
    <p>Profit: ${formatRupiah(profitTahun)}</p>
  `;
}
