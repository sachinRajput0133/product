const productRepository = require('../repositories/productRepository');
const { AppError } = require('../middlewares/errorHandler');

const getAllProducts = async ({ search, category }) => {
  return productRepository.findAll({ search, category });
};

const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

const createProduct = async (data) => {
  return productRepository.create(data);
};

const updateProduct = async (id, data) => {
  await getProductById(id);
  return productRepository.update(id, data);
};

const deleteProduct = async (id) => {
  await getProductById(id);
  await productRepository.remove(id);
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
