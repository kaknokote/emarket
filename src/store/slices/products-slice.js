import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('http://localhost:3000/products');

			if (!response.ok) {
				throw new Error('Ошибка сервера');
			}

			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const addNewProduct = createAsyncThunk(
	'products/addNewProduct',
	async function (productData, { rejectWithValue, dispatch }) {
		try {
			const product = {
				// id: new Date().toISOString(),
				name: productData.name,
				description: productData.description,
				imageUrl: productData.imageUrl,
				category: productData.category,
			};

			const response = await fetch(`http://localhost:3000/products`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(product),
			});

			if (!response.ok) {
				throw new Error('Ошибка добавления');
			}

			const newProduct = await response.json();
			dispatch(addProduct(newProduct));

			return newProduct;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`http://localhost:3000/products/${id}`,
				{ method: 'DELETE' },
			);

			if (!response.ok) {
				throw new Error('Ошибка удаления');
			}

			dispatch(removeProduct({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const updateProductData = createAsyncThunk(
	'products/updateProductData',
	async function (
		{ id, updatedFields },
		{ rejectWithValue, dispatch, getState },
	) {
		const product = getState().products.products.find(
			(product) => product.id === id,
		);

		if (!product) {
			throw new Error('Продукт не найден');
		}

		try {
			const response = await fetch(
				`http://localhost:3000/products/${id}`,
				{
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedFields),
				},
			);

			if (!response.ok) {
				throw new Error('Ошибка изменения');
			}

			const updatedProduct = await response.json();
			dispatch(updateProduct({ id, ...updatedProduct }));

			return updatedProduct;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		status: null,
		error: null,
	},
	reducers: {
		addProduct(state, action) {
			state.products.push(action.payload);
		},
		removeProduct(state, action) {
			state.products = state.products.filter(
				(product) => product.id !== action.payload.id,
			);
		},
		updateProduct(state, action) {
			const { id, ...updatedFields } = action.payload;
			const index = state.products.findIndex(
				(product) => product.id === id,
			);

			if (index !== -1) {
				state.products[index] = {
					...state.products[index],
					...updatedFields,
				};
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.status = 'resolved';
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(updateProductData.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateProductData.fulfilled, (state, action) => {
				const index = state.products.findIndex(
					(product) => product.id === action.payload.id,
				);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
			})
			.addCase(updateProductData.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(addNewProduct.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addNewProduct.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.products.push(action.payload);
			})
			.addCase(addNewProduct.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			});
	},
});

export const { addProduct, removeProduct, updateProduct } =
	productsSlice.actions;

export default productsSlice.reducer;
