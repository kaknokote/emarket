import {
	BsCart,
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
	BsFillPersonXFill,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks';

export const RightGroup = () => {
	const { user, isAuthentificated, logout } = useAuth();

	return (
		<div className="w-[400px] mt-4 mr-4 flex flex-wrap gap-3 text-xl">
			<Link
				to="/cart"
				className="ml-5 flex flex-wrap gap-1 hover:text-blue-400 hover:cursor-pointer transition-colors duration-300"
			>
				<BsCart className="mt-1" />
				<div>Корзина</div>
			</Link>
			{isAuthentificated ? (
				<div className="ml-5 flex flex-wrap gap-1">
					Привет, {user.name}
					<BsFillPersonXFill
						onClick={logout}
						className="mt-1 ml-3 hover:text-red-400 hover:cursor-pointer transition-colors duration-300"
					/>
				</div>
			) : (
				<>
					<Link
						to="/login"
						className="ml-5 flex flex-wrap gap-1 hover:text-blue-400 hover:cursor-pointer transition-colors duration-300"
					>
						<BsFillPersonCheckFill className="mt-1" />
						<div>Вход</div>
					</Link>
					<Link
						to="/register"
						className="ml-5 flex flex-wrap gap-1 hover:text-blue-400 hover:cursor-pointer transition-colors duration-300 "
					>
						<BsFillPersonPlusFill className="mt-1" />
						<div>Регистрация</div>
					</Link>
				</>
			)}
		</div>
	);
};
