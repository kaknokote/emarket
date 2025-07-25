import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/products-slice';
import { useEffect } from 'react';
import { ProductCard } from './product-card';
import { Link } from 'react-router-dom';

export const Products = () => {
	const dispatch = useDispatch();
	const { products, status, error } = useSelector((state) => state.products);

	useEffect(() => {
		if (status === null) {
			dispatch(fetchProducts());
		}
	}, [dispatch, status]);

	if (status === 'loading') {
		return <div className="text-center p-6">Loading...</div>;
	}

	if (status === 'rejected' && error) {
		return (
			<div className="text-center p-6 text-red-600">Error: {error}</div>
		);
	}

	if (status === 'resolved' && products.length === 0) {
		return <div className="text-center p-6">No products found.</div>;
	}

	return (
		<div className="flex flex-wrap gap-6 justify-center mt-8">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
