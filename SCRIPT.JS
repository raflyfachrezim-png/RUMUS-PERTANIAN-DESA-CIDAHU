function formatRupiah(x) {
  return "Rp " + Math.round(x).toLocaleString("id-ID");
}

function hitung() {

  const luas = parseFloat(document.getElementById("luas").value);
  const komoditas = document.getElementById("komoditas").value;
  const hasilDiv = document.getElementById("hasil");

  if (!luas || luas <= 0) {
    hasilDiv.innerHTML = "Isi luas lahan dulu!";
    return;
  }

  const d = database[komoditas];

  const faktor = luas / d.luasPatokan;

  // ===== PER MUSIM =====
  const upah = d.upah * faktor;
  const produksi = d.produksi * faktor;
  const operasional = d.operasional * faktor;
  const nonOp = d.nonOperasional * faktor;

  const biayaMusim = upah + produksi + operasional + nonOp;

  const hasilMusim = d.hasilPanen * faktor;
  const pendapatanMusim = hasilMusim * d.harga;

  const profitMusim = pendapatanMusim - biayaMusim;

  // ===== PER TAHUN =====
  const panen = d.panenTahun;

  const biayaTahun = biayaMusim * panen;
  const pendapatanTahun = pendapatanMusim * panen;
  const profitTahun = profitMusim * panen;

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <h3>🌾 PER MUSIM</h3>
    <div class="row"><span>Biaya</span><b>${formatRupiah(biayaMusim)}</b></div>
    <div class="row"><span>Pendapatan</span><b>${formatRupiah(pendapatanMusim)}</b></div>
    <div class="row"><span>Profit</span><b>${formatRupiah(profitMusim)}</b></div>

    <hr>

    <h3>📅 PER TAHUN (${panen}x panen)</h3>
    <div class="row"><span>Biaya</span><b>${formatRupiah(biayaTahun)}</b></div>
    <div class="row"><span>Pendapatan</span><b>${formatRupiah(pendapatanTahun)}</b></div>
    <div class="row"><span>Profit</span><b>${formatRupiah(profitTahun)}</b></div>
  `;
}
