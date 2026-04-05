import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editingProduct: null,
  isFormOpen: false,
  searchTerm: '',
  categoryFilter: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    openAddForm(state) {
      state.editingProduct = null;
      state.isFormOpen = true;
    },
    openEditForm(state, action) {
      state.editingProduct = action.payload;
      state.isFormOpen = true;
    },
    closeForm(state) {
      state.editingProduct = null;
      state.isFormOpen = false;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
  },
});

export const { openAddForm, openEditForm, closeForm, setSearchTerm, setCategoryFilter } =
  productSlice.actions;

export default productSlice.reducer;
