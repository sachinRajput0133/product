const prisma = require('../config/database');

const findAll = async ({ search, category }) => {
  const where = {};
  if (search) where.name = { contains: search, mode: 'insensitive' };
  if (category) where.category = { equals: category, mode: 'insensitive' };

  return prisma.product.findMany({ where, orderBy: { created_at: 'desc' } });
};

const findById = async (id) => {
  return prisma.product.findUnique({ where: { id } });
};

const create = async (data) => {
  return prisma.product.create({ data });
};

const update = async (id, data) => {
  return prisma.product.update({ where: { id }, data });
};

const remove = async (id) => {
  return prisma.product.delete({ where: { id } });
};

module.exports = { findAll, findById, create, update, remove };
