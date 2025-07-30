import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/slices/auth-slice';
import { Input } from '../input/input';
import { useAuth } from '../../hooks';

export const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status, error, isAuthentificated, clearError } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		if (isAuthentificated) {
			navigate('/');
		}
	}, [isAuthentificated, navigate]);

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
		if (error) {
			clearError();
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			dispatch({
				type: 'auth/register/rejected',
				payload: 'Пароли не совпадают',
			});
			return;
		}
		clearError();
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
					onChange={handleChange(setName)}
				/>
				<Input
					type="email"
					name="email"
					placeholder="Электронная почта"
					value={email}
					onChange={handleChange(setEmail)}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					onChange={handleChange(setPassword)}
				/>
				<Input
					type="password"
					name="confirmPassword"
					placeholder="Повтор пароля"
					value={confirmPassword}
					onChange={handleChange(setConfirmPassword)}
				/>
				<button
					type="submit"
					disabled={status === 'loading' || error}
					className="w-full p-2.5 bg-blue-400 text-white rounded-md disabled:bg-blue-200 hover:bg-blue-500 transition-colors duration-200"
				>
					{status === 'loading'
						? 'Загрузка...'
						: 'Зарегистрироваться'}
				</button>
			</form>
			<Link to="/login">
				<div className="mt-5 text-center text-blue-400 hover:underline">
					У меня уже есть аккаунт
				</div>
			</Link>
		</div>
	);
};
