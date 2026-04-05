const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(1).max(255).trim().required(),
  category: Joi.string().min(1).max(100).trim().required(),
  price: Joi.number().positive().precision(2).required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().max(1000).allow(null, '').optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(255).trim(),
  category: Joi.string().min(1).max(100).trim(),
  price: Joi.number().positive().precision(2),
  quantity: Joi.number().integer().min(0),
  description: Joi.string().max(1000).allow(null, '').optional(),
}).min(1);

const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return next(error);
  req.body = value;
  next();
};

module.exports = { validate, productSchema, updateProductSchema };
