import { Link } from 'react-router-dom';
import { Input } from '../input/input';

export const Login = () => {
	return (
		<div className="w-[400px] mx-auto mt-20">
			<div className="text-4xl text-center font-semibold">Вход</div>
			<Input type="text" placeholder="Электронная почта" />
			<Input type="password" placeholder="Пароль" />
			<Link to="/register">
				<div className="mt-5 text-center">У меня еще нет аккаунта</div>
			</Link>
		</div>
	);
};
