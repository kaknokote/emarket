import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/auth-slice';
import { Input } from '../input/input';
import { useAuth } from '../../hooks';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthentificated, status, error, clearError } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
		clearError();
		dispatch(login({ email, password })).then((result) => {
			if (result.meta.requestStatus === 'fulfilled') {
				navigate('/');
			}
		});
	};

	return (
		<div className="w-[400px] mx-auto mt-20">
			<div className="text-4xl text-center font-semibold mb-6">Вход</div>
			{status === 'rejected' && error && (
				<p className="text-red-400 text-center mb-4">{error}</p>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
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
				<button
					type="submit"
					disabled={status === 'loading' || error}
					className="w-full p-2.5 bg-blue-400 text-white rounded-md disabled:bg-blue-200 hover:bg-blue-500 transition-colors duration-200"
				>
					{status === 'loading' ? 'Загрузка...' : 'Войти'}
				</button>
			</form>
			<Link to="/register">
				<div className="mt-5 text-center text-blue-400 hover:underline">
					У меня ещё нет аккаунта
				</div>
			</Link>
		</div>
	);
};
