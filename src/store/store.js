import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/products-slice';

export const store = configureStore({
	reducer: {
		products: productReducer,
	},
});
