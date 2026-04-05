'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeForm } from '@/store/productSlice';
import { useCreateProductMutation, useUpdateProductMutation } from '@/store/apiSlice';

const CATEGORIES = ['Electronics', 'Clothing', 'Food & Beverage', 'Books', 'Furniture', 'Sports', 'Other'];

const emptyForm = { name: '', category: '', price: '', quantity: '', description: '' };

export default function ProductForm() {
  const dispatch = useDispatch();
  const { editingProduct } = useSelector((s) => s.products);
  const isEditing = !!editingProduct;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        price: String(editingProduct.price),
        quantity: String(editingProduct.quantity),
        description: editingProduct.description ?? '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [editingProduct]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.category) errs.category = 'Category is required';
    const price = parseFloat(form.price);
    if (!form.price || isNaN(price) || price <= 0) errs.price = 'Enter a valid positive price';
    const qty = parseInt(form.quantity, 10);
    if (form.quantity === '' || isNaN(qty) || qty < 0) errs.quantity = 'Enter a valid quantity';
    if (form.description.length > 1000) errs.description = 'Too long (max 1000 chars)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: parseFloat(parseFloat(form.price).toFixed(2)),
      quantity: parseInt(form.quantity, 10),
      description: form.description.trim() || undefined,
    };

    try {
      if (isEditing) {
        await updateProduct({ id: editingProduct.id, ...payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      dispatch(closeForm());
    } catch (err) {
      alert(err?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && dispatch(closeForm())}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={() => dispatch(closeForm())}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4" noValidate>
          <div>
            <label className="label" htmlFor="name">Product Name <span className="text-red-500">*</span></label>
            <input
              ref={firstInputRef}
              id="name"
              name="name"
              type="text"
              className={`input ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
              placeholder="e.g. Wireless Headphones"
              value={form.name}
              onChange={handleChange}
              maxLength={255}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="label" htmlFor="category">Category <span className="text-red-500">*</span></label>
            <select
              id="category"
              name="category"
              className={`input ${errors.category ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="price">Price (USD) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">$</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  className={`input pl-7 ${errors.price ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>

            <div>
              <label className="label" htmlFor="quantity">Quantity <span className="text-red-500">*</span></label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                className={`input ${errors.quantity ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                placeholder="0"
                value={form.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="description">
              Description <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`input resize-none ${errors.description ? 'border-red-400' : ''}`}
              placeholder="Short product description..."
              value={form.description}
              onChange={handleChange}
              maxLength={1000}
            />
            <div className="flex justify-between mt-1">
              {errors.description
                ? <p className="text-xs text-red-500">{errors.description}</p>
                : <span />
              }
              <span className="text-xs text-gray-400">{form.description.length}/1000</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => dispatch(closeForm())}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isEditing ? 'Saving...' : 'Adding...'}
                </>
              ) : isEditing ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
