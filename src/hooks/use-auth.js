import { useDispatch, useSelector } from 'react-redux';
import { clearError, logout } from '../store/slices/auth-slice';

export const useAuth = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const status = useSelector((state) => state.auth.status);
	const error = useSelector((state) => state.auth.error);

	return {
		user,
		isAuthentificated: !!user,
		isAdmin: user?.role === 'admin',
		status,
		error,
		logout: () => dispatch(logout()),
		clearError: () => dispatch(clearError()),
	};
};
