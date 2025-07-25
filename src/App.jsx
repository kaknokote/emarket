import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/slices/products-slice';
import { Route, Routes } from 'react-router-dom';
import { CartPage, LoginPage, ProductsPage, RegisterPage } from './pages';
import { Header } from './components';

export const App = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div className="w-[1200px] mx-auto my-16 px-6 py-6 bg-neutral-50 min-h-screen rounded-xl">
			<Header />
			<Routes>
				<Route path="/" element={<ProductsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
		</div>
	);
};
