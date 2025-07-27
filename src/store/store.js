import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/products-slice';
import authReducer from './slices/auth-slice';

export const store = configureStore({
	reducer: {
		products: productReducer,
		auth: authReducer,
	},
});
