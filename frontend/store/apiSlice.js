import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search = '', category = '' } = {}) => ({
        url: '/products',
        params: { search, category },
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Products', id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    createProduct: builder.mutation({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled, getState }) {
        const patches = [];
        const queries = getState()['api']?.queries ?? {};

        Object.keys(queries).forEach((key) => {
          if (key.startsWith('getProducts(')) {
            const args = JSON.parse(key.replace('getProducts(', '').slice(0, -1));
            patches.push(
              dispatch(
                apiSlice.util.updateQueryData('getProducts', args, (draft) => {
                  const item = draft.data.find((p) => p.id === id);
                  if (item) Object.assign(item, patch);
                })
              )
            );
          }
        });

        try {
          await queryFulfilled;
        } catch {
          patches.forEach((p) => p.undo());
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;
