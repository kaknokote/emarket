import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductCard } from './product-card';
import { useEffect } from 'react';
import { useAuth } from '../../hooks';
import { addToCart, clearError } from '../../store/slices/auth-slice';

export const Product = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);
	const productsStatus = useSelector((state) => state.products.status);
	const productsError = useSelector((state) => state.products.error);
	const product = products.find((p) => p.id === id);
	const { status, error, isAuthentificated, user } = useAuth();

	const isInCart = user?.cart?.some((item) => item.productId === id);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error || productsError) {
			dispatch(clearError());
		}
	}, [id, error, productsError, dispatch]);

	const handleAddToCart = (event) => {
		event.preventDefault();
		console.log('handleAddToCart:', { productId: String(id) });
		dispatch(addToCart(String(id)));
	};

	if (productsStatus === 'loading') {
		return (
			<div className="text-center text-4xl mt-20 font-semibold">
				Загрузка продукта...
			</div>
		);
	}

	if (productsError) {
		return (
			<div className="text-center text-4xl mt-20 font-semibold text-red-400">
				Ошибка загрузки продуктов: {productsError}
			</div>
		);
	}

	if (!product) {
		return (
			<div className="text-center text-4xl mt-20 font-semibold text-red-400">
				Product not found
			</div>
		);
	}

	return (
		<div className="p-6 flex flex-col lg:flex-row gap-6">
			<div className="flex flex-col md:flex-row gap-6 flex-1">
				<div className="flex-shrink-0">
					<img
						src={product.imageUrl}
						alt={product.name}
						className="w-[300px] h-[300px] object-contain rounded"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold text-gray-800">
						{product.name}
					</h2>
					<div className="text-xl text-neutral-500 mb-[-20px]">
						Категория:
					</div>
					<div className="text-xl font-semibold">
						{product.category}
					</div>
					<div className="text-xl text-neutral-500 mb-[-20px]">
						Количество на складе:
					</div>
					{product.quantity ? (
						<div className="text-xl font-semibold">
							{product.quantity}
						</div>
					) : (
						<div className="text-xl font-semibold">
							Товар закончился
						</div>
					)}
					<div className="text-xl text-neutral-500 mb-[-20px]">
						Цена:
					</div>
					<div className="text-xl font-semibold text-emerald-600">
						{product.price}₽
					</div>
					<div className="text-gray-600 max-w-prose">
						{product.description}
					</div>
					{error && (
						<div className="text-red-500 text-lg">
							Ошибка: {error}
						</div>
					)}
					<button
						type="button"
						disabled={
							status === 'loading' ||
							!isAuthentificated ||
							isInCart ||
							!product.quantity
						}
						onClick={handleAddToCart}
						className={`w-full p-2.5 text-white rounded-md transition-colors duration-200 ${
							isInCart
								? 'bg-green-500 cursor-not-allowed'
								: 'bg-blue-400 hover:bg-blue-500 disabled:bg-blue-200'
						}`}
					>
						{isInCart ? 'Уже в корзине' : 'Добавить в корзину'}
					</button>
				</div>
			</div>
			<div className="w-full lg:w-[400px] flex-shrink-0">
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Похожие товары
				</h3>
				<div className="flex flex-col gap-4">
					{products
						.filter(
							(p) =>
								p.category === product.category && p.id !== id,
						)
						.map((similarProduct) => (
							<ProductCard
								key={similarProduct.id}
								product={similarProduct}
							/>
						))}
					{products.filter(
						(p) => p.category === product.category && p.id !== id,
					).length === 0 && (
						<div className="text-gray-600">Нет похожих товаров</div>
					)}
				</div>
			</div>
		</div>
	);
};
