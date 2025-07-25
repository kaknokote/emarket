import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductCard } from './product-card';
import { useEffect } from 'react';

export const Product = () => {
	const { id } = useParams();
	const products = useSelector((state) => state.products.products);
	const product = products.find((p) => p.id === id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	const similarProducts = products.filter(
		(p) => p.category === product.category && p.id !== product.id,
	);

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
						className="w-[300px] h-[300px] object-contain rou"
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
				</div>
			</div>
			<div className="w-full lg:w-[400px] flex-shrink-0">
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Похожие товары
				</h3>
				<div className="flex flex-col gap-4">
					{similarProducts.length > 0 ? (
						similarProducts.map((similarProduct) => (
							<ProductCard
								key={similarProduct.id}
								product={similarProduct}
							/>
						))
					) : (
						<div className="text-gray-600">Нет похожих товаров</div>
					)}
				</div>
			</div>
		</div>
	);
};
