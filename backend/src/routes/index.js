const { Router } = require('express');
const productRoutes = require('./productRoutes');

const router = Router();

router.use('/products', productRoutes);

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'OK' });
});

module.exports = router;
