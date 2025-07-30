import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks';
import { removeFromCart } from '../../store/slices/auth-slice';
import { ProductCard } from '../products/product-card';

export const Cart = () => {
	const dispatch = useDispatch();
	const { user, status, error } = useAuth();
	const products = useSelector((state) => state.products.products);
	let sum = 0;

	if (status === 'loading') {
		return (
			<div className="text-4xl mt-6 text-center font-semibold mb-6">
				Загрузка...
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-4xl mt-6 text-center font-semibold mb-6 text-red-500">
				Ошибка: {error}
			</div>
		);
	}

	if (!user) {
		return (
			<div className="text-4xl mt-6 text-center font-semibold mb-6">
				Пожалуйста, авторизуйтесь, чтобы посмотреть корзину
			</div>
		);
	}

	if (user.cart.length === 0) {
		return (
			<div className="text-4xl mt-6 text-center font-semibold mb-6">
				Ваша корзина пуста
			</div>
		);
	}

	return (
		<div className="p-6">
			<h2 className="text-4xl text-center font-semibold mb-6">Корзина</h2>
			<div className="flex flex-wrap gap-4">
				{user.cart.map((item) => {
					const product = products.find(
						(p) => p.id === item.productId,
					);
					sum += product.price;
					return (
						<div
							key={item.productId}
							className="flex justify-between items-center mb-4 pb-4"
						>
							<div className="flex flex-wrap w-[260px] justify-center">
								<ProductCard product={product} />
								<button
									type="button"
									onClick={() =>
										dispatch(removeFromCart(item.productId))
									}
									className="p-2 mt-2 w-[250px] bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
								>
									Удалить
								</button>
							</div>
						</div>
					);
				})}
				<div className="text-2xl text-center font-semibold mb-6">
					Сумма корзины: {sum}₽
				</div>
			</div>
		</div>
	);
};
