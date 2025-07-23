import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/slices/products-slice';

export const App = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div>
			{products.map((product) => (
				<div key={product.id}>
					<div>{product.name}</div>
					<img src={product.imageUrl} alt="Изображение" width="200" />
				</div>
			))}
		</div>
	);
};
