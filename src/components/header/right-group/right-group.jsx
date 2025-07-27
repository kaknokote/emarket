import {
	BsCart,
	BsFillPersonCheckFill,
	BsFillPersonPlusFill,
	BsFillPersonXFill,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../store/slices/auth-slice';

export const RightGroup = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const onLogOutClick = () => {
		dispatch(logout());
	};

	return (
		<div className="w-[450px] mt-4 flex flex-wrap gap-3 text-xl">
			<Link to="/cart" className="ml-5 flex flex-wrap gap-1">
				<BsCart className="mt-1" />
				<div>Корзина</div>
			</Link>
			{user ? (
				<div className="ml-5 flex flex-wrap gap-1">
					Добро пожаловать, {user.name}
					<BsFillPersonXFill
						onClick={onLogOutClick}
						className="mt-1 ml-3 hover:text-red-400 hover:cursor-pointer transition-colors duration-300"
					/>
				</div>
			) : (
				<>
					<Link to="/login" className="ml-5 flex flex-wrap gap-1">
						<BsFillPersonCheckFill className="mt-1" />
						<div>Вход</div>
					</Link>
					<Link to="/register" className="ml-5 flex flex-wrap gap-1">
						<BsFillPersonPlusFill className="mt-1" />
						<div>Регистрация</div>
					</Link>
				</>
			)}
		</div>
	);
};
