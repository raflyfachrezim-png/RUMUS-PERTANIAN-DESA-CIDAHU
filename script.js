function formatRupiah(x) {
  return "Rp " + Math.round(x).toLocaleString("id-ID");
}

function hitung() {

  const hasilDiv = document.getElementById("hasil");
  const luas = parseFloat(document.getElementById("luas").value);
  const komoditas = document.getElementById("komoditas").value;

  if (!luas || luas <= 0) {
    hasilDiv.innerHTML = "ISI LUAS DULU";
    return;
  }

  const d = database[komoditas];
  const faktor = luas / d.luasPatokan;

  // ===== PER MUSIM =====
  const upah = d.upah * faktor;
  const produksi = d.produksi * faktor;
  const operasional = d.operasional * faktor;
  const nonOp = d.nonOperasional * faktor;

  const totalBiaya = upah + produksi + operasional + nonOp;

  const hasilKg = d.hasilPanen * faktor;
  const hargaKg = d.harga;

  const pendapatanMusim = hasilKg * hargaKg;
  const profitMusim = pendapatanMusim - totalBiaya;

  // ===== PER TAHUN =====
  const panen = d.panenTahun;

  const biayaTahun = totalBiaya * panen;
  const hasilKgTahun = hasilKg * panen;
  const pendapatanTahun = pendapatanMusim * panen;
  const profitTahun = profitMusim * panen;

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <h3>🌾 PER MUSIM</h3>

    <p><b>Upah Pekerja:</b> ${formatRupiah(upah)}</p>
    <p><b>Biaya Produksi:</b> ${formatRupiah(produksi)}</p>
    <p><b>Biaya Operasional:</b> ${formatRupiah(operasional)}</p>
    <p><b>Biaya Non Operasional:</b> ${formatRupiah(nonOp)}</p>

    <hr>

    <p><b>Hasil Panen:</b> ${hasilKg.toFixed(0)} kg</p>
    <p><b>Harga / kg:</b> ${formatRupiah(hargaKg)}</p>

    <p><b>Total Biaya:</b> ${formatRupiah(totalBiaya)}</p>
    <p><b>Pendapatan:</b> ${formatRupiah(pendapatanMusim)}</p>
    <p><b>Profit:</b> ${formatRupiah(profitMusim)}</p>

    <hr>

    <h3>📅 PER TAHUN (${panen}x panen)</h3>

    <p><b>Total Biaya:</b> ${formatRupiah(biayaTahun)}</p>
    <p><b>Hasil Panen:</b> ${hasilKgTahun.toFixed(0)} kg</p>
    <p><b>Pendapatan:</b> ${formatRupiah(pendapatanTahun)}</p>
    <p><b>Profit:</b> ${formatRupiah(profitTahun)}</p>
  `;
}
