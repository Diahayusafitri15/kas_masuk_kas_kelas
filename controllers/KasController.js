let kasData = [];

// GET /api/kas
exports.getAllKas = (req, res) => {
  res.json({
    message: 'Berhasil mengambil data kas',
    data: kasData
  });
};
// GET /api/kas/rekap
exports.getRekapKas = (req, res) => {
  let totalMasuk = 0;
  let totalKeluar = 0;

  kasData.forEach(item => {
    if (item.tipe === 'masuk') {
      totalMasuk += item.jumlah;
    } else if (item.tipe === 'keluar') {
      totalKeluar += item.jumlah;
    }
  });

  const saldo = totalMasuk - totalKeluar;

  res.json({
    message: 'Rekap kas',
    totalMasuk,
    totalKeluar,
    saldo
  });
};

// POST /api/kas
exports.createKas = (req, res) => {
  const { nama, jumlah, tipe } = req.body;

  if (!nama || !jumlah || !tipe) {
    return res.status(400).json({ message: 'Nama, jumlah, dan tipe wajib diisi' });
  }

  if (tipe !== 'masuk' && tipe !== 'keluar') {
    return res.status(400).json({ message: 'Tipe harus "masuk" atau "keluar"' });
  }

  const newKas = { id: kasData.length + 1, nama, jumlah, tipe };
  kasData.push(newKas);

  res.status(201).json({
    message: 'Data kas berhasil ditambahkan',
    data: newKas
  });
};

// PUT /api/kas/:id
exports.updateKas = (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, jumlah, tipe } = req.body;

  const index = kasData.findIndex(kas => kas.id === id);
  if (index === -1) return res.status(404).json({ message: 'Data tidak ditemukan' });

  if (tipe !== 'masuk' && tipe !== 'keluar') {
    return res.status(400).json({ message: 'Tipe harus "masuk" atau "keluar"' });
  }

  kasData[index] = { id, nama, jumlah, tipe };

  res.json({
    message: 'Data kas berhasil diubah',
    data: kasData[index]
  });
};

// PATCH /api/kas/:id
exports.partialUpdateKas = (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  const index = kasData.findIndex(kas => kas.id === id);
  if (index === -1) return res.status(404).json({ message: 'Data tidak ditemukan' });

  if (data.tipe && data.tipe !== 'masuk' && data.tipe !== 'keluar') {
    return res.status(400).json({ message: 'Tipe harus "masuk" atau "keluar"' });
  }

  kasData[index] = { ...kasData[index], ...data };

  res.json({
    message: 'Data kas berhasil diperbarui sebagian',
    data: kasData[index]
  });
};

// DELETE /api/kas/:id
exports.deleteKas = (req, res) => {
  const id = parseInt(req.params.id);

  const index = kasData.findIndex(kas => kas.id === id);
  if (index === -1) return res.status(404).json({ message: 'Data tidak ditemukan' });

  const deleted = kasData.splice(index, 1);

  res.json({
    message: 'Data kas berhasil dihapus',
    data: deleted[0]
  });
};
