// 1. Import module yang dibutuhkan
const express = require('express');
const app = express();

// Import route dan koneksi db
const kasRoutes = require('./routes/kas');
require('./db'); // jika ada koneksi DB

// 2. Middleware
app.use(express.json()); // supaya bisa membaca request JSON

// 3. Route dasar (opsional, untuk cek server)
app.get('/', (req, res) => {
  res.send('API Kas aktif. Gunakan endpoint di /api/kas');
});

// 4. Routes
app.use('/api/kas', kasRoutes);

// 5. Jalankan server
const PORT = 9004;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
