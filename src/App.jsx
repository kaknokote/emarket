import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/slices/products-slice';
import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/products-page';

export const App = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div className="w-[1300px] mx-auto my-16 px-6 py-6 bg-neutral-50 min-h-screen rounded-xl">
			<Routes>
				<Route path="/" element={<ProductsPage />} />
			</Routes>
		</div>
	);
};
