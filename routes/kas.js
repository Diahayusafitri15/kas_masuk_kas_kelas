const express = require('express');
const router = express.Router();
const KasController = require('../controllers/KasController');

router.get('/', KasController.getAllKas); // Menampilkan semua data kas
router.post('/', KasController.createKas);  // Menambahkan data kas
router.put('/:id', KasController.updateKas); // Mengubah data kas
router.patch('/:id', KasController.partialUpdateKas); // mengubah sebagian data
router.delete('/:id', KasController.deleteKas); // Menghapus data kas
router.get('/rekap', KasController.getRekapKas); // menampilkan semua rekapan kas

module.exports = router;
