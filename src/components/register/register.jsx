import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/slices/auth-slice';
import { Input } from '../input/input';

export const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, status, error } = useSelector((state) => state.auth);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(
			register({
				name,
				email,
				password,
			}),
		).then((result) => {
			if (result.meta.requestStatus === 'fulfilled') {
				navigate('/');
			}
		});
	};

	return (
		<div className="w-[400px] mx-auto mt-20">
			<div className="text-4xl text-center font-semibold mb-6">
				Регистрация
			</div>
			{status === 'rejected' && error && (
				<p className="text-red-400 text-center mb-4">{error}</p>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					type="text"
					name="name"
					placeholder="Имя"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					type="email"
					name="email"
					placeholder="Электронная почта"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					type="password"
					name="confirmPassword"
					placeholder="Повтор пароля"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="w-full p-2.5 bg-emerald-600 text-white rounded-md"
				>
					Зарегистрироваться
				</button>
			</form>
			<Link to="/login">
				<div className="mt-5 text-center text-emerald-600">
					У меня уже есть аккаунт
				</div>
			</Link>
		</div>
	);
};
