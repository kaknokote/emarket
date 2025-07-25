import { Link } from 'react-router-dom';
import { Input } from '../input/input';

export const Register = () => {
	return (
		<div className="w-[400px] mx-auto mt-20">
			<div className="text-4xl text-center font-semibold">
				Регистрация
			</div>
			<Input type="text" placeholder="Электронная почта" />
			<Input type="password" placeholder="Пароль" />
			<Input type="password" placeholder="Повтор пароля" />
			<Link to="/login">
				<div className="mt-5 text-center">У меня уже есть аккаунт</div>
			</Link>
		</div>
	);
};
