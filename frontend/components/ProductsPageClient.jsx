'use client';

import { useDispatch, useSelector } from 'react-redux';
import { openAddForm, setSearchTerm, setCategoryFilter } from '@/store/productSlice';
import { useGetProductsQuery } from '@/store/apiSlice';
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import TableSkeleton from './TableSkeleton';

export default function ProductsPageClient() {
  const dispatch = useDispatch();
  const { isFormOpen, searchTerm, categoryFilter } = useSelector((s) => s.products);
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data, isLoading, isFetching, isError } = useGetProductsQuery({
    search: debouncedSearch,
    category: categoryFilter,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {data ? `${data.data.length} product${data.data.length !== 1 ? 's' : ''}` : 'Loading...'}
          </p>
        </div>
        <button className="btn-primary" onClick={() => dispatch(openAddForm())}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      <div className="card p-4">
        <SearchBar
          value={searchTerm}
          category={categoryFilter}
          onSearch={(v) => dispatch(setSearchTerm(v))}
          onCategory={(v) => dispatch(setCategoryFilter(v))}
          isFetching={isFetching && !isLoading}
        />
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="w-12 h-12 text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-gray-600 font-medium">Failed to load products</p>
            <p className="text-gray-400 text-sm mt-1">Please check your connection and try again.</p>
          </div>
        ) : !data?.data.length ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-600 font-medium">
              {debouncedSearch || categoryFilter ? 'No products match your filters' : 'No products yet'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {debouncedSearch || categoryFilter ? 'Try adjusting your search or filter' : 'Click "Add Product" to get started'}
            </p>
          </div>
        ) : (
          <ProductTable products={data.data} isFetching={isFetching} />
        )}
      </div>

      {isFormOpen && <ProductForm />}
    </div>
  );
}
