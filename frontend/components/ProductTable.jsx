'use client';

import { useDispatch } from 'react-redux';
import { openEditForm } from '@/store/productSlice';
import { useDeleteProductMutation } from '@/store/apiSlice';

const fmtPrice = (p) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(p));

const fmtDate = (d) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(d));

const stockBadge = (qty) => {
  if (qty === 0) return 'bg-red-100 text-red-700';
  if (qty < 10) return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
};

export default function ProductTable({ products, isFetching }) {
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(id).unwrap();
    } catch {
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className={`transition-opacity duration-200 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Product', 'Category', 'Price', 'Quantity', 'Created', ''].map((h) => (
                <th
                  key={h}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${h === '' ? 'text-right' : 'text-left'}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">
                        {product.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      {product.description && (
                        <p className="text-xs text-gray-400 truncate max-w-xs">{product.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">{fmtPrice(product.price)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockBadge(product.quantity)}`}>
                    {product.quantity} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{fmtDate(product.created_at)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => dispatch(openEditForm(product))}>
                      Edit
                    </button>
                    <button
                      className="btn-danger text-xs px-3 py-1.5"
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {products.map((product) => (
          <div key={product.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">{product.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-blue-600">{product.category}</p>
                  <p className="text-sm text-gray-500">{fmtPrice(product.price)}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${stockBadge(product.quantity)}`}>
                {product.quantity}
              </span>
            </div>
            {product.description && (
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            )}
            <div className="flex gap-2 pt-1">
              <button className="btn-secondary flex-1 text-xs" onClick={() => dispatch(openEditForm(product))}>
                Edit
              </button>
              <button
                className="btn-danger flex-1 text-xs"
                onClick={() => handleDelete(product.id, product.name)}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
