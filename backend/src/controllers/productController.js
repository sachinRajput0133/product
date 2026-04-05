const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const products = await productService.getAllProducts({ search, category });
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.getProductById(id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.updateProduct(id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await productService.deleteProduct(id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
