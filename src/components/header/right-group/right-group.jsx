import {
	BsCart,
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const RightGroup = () => {
	return (
		<div className="w-[450px] mt-4 flex flex-wrap gap-3 text-xl">
			<Link to="/cart" className="ml-5 flex flex-wrap gap-1">
				<BsCart className="mt-1" />
				<div>Корзина</div>
			</Link>
			<Link to="/login" className="ml-5 flex flex-wrap gap-1">
				<BsFillPersonCheckFill className="mt-1" />
				<div>Вход</div>
			</Link>
			<Link to="/register" className="ml-5 flex flex-wrap gap-1">
				<BsFillPersonPlusFill className="mt-1" />
				<div>Регистрация</div>
			</Link>
		</div>
	);
};
