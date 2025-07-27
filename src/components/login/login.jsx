import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/auth-slice';
import { Input } from '../input/input';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, status, error } = useSelector((state) => state.auth);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	const handleSubmit = (event) => {
		event.preventDefault();
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
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					disabled={status === 'loading'}
					className="w-full p-2.5 bg-emerald-600 text-white rounded-md disabled:bg-emerald-400"
				>
					{status === 'loading' ? 'Загрузка...' : 'Войти'}
				</button>
			</form>
			<Link to="/register">
				<div className="mt-5 text-center text-emerald-600">
					У меня ещё нет аккаунта
				</div>
			</Link>
		</div>
	);
};
