import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
	'auth/login',
	async function ({ email, password }, { rejectWithValue }) {
		try {
			const response = await fetch(
				`http://localhost:3000/users?email=${email}&password=${password}`,
			);
			if (!response.ok) {
				throw new Error('Ошибка сети');
			}
			const users = await response.json();
			if (users.length === 0) {
				throw new Error('Неверный email или пароль');
			}
			return users[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async function ({ name, email, password }, { rejectWithValue }) {
		try {
			const checkResponse = await fetch(
				`http://localhost:3000/users?email=${email}`,
			);
			const existingUser = await checkResponse.json();
			console.log(existingUser);

			if (existingUser.length > 0) {
				throw new Error('Пользователь с таким email уже существует');
			}

			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password, role: 'user' }),
			});

			if (!response.ok) {
				throw new Error('Произошла ошибка при регистрации');
			}

			return await response.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const restoreAuth = createAsyncThunk(
	'auth/restoreAuth',
	async function (_, { rejectWithValue }) {
		try {
			const user = localStorage.getItem('user');
			if (!user) {
				throw new Error('Нет данных о пользователе');
			}
			return JSON.parse(user);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		status: null,
		error: null,
	},
	reducers: {
		logout(state) {
			state.user = null;
			state.status = null;
			state.error = null;
			localStorage.removeItem('user');
		},
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.user = action.payload;
				localStorage.setItem('user', JSON.stringify(action.payload));
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})

			.addCase(register.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.user = action.payload;
				localStorage.setItem('user', JSON.stringify(action.payload));
			})
			.addCase(register.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(restoreAuth.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.user = action.payload;
			})
			.addCase(restoreAuth.rejected, (state) => {
				state.status = null;
				state.user = null;
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
