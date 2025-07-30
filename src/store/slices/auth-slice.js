import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk(
	'auth/addToCart',
	async function (productId, { getState, rejectWithValue }) {
		try {
			const { auth, products } = getState();
			const user = auth.user;
			if (!user) {
				throw new Error('Пользователь не авторизован');
			}

			const product = products.products.find((p) => p.id === productId);
			if (!product) {
				throw new Error('Товар не найден');
			}

			const isInCart = user.cart.some(
				(item) => item.productId === productId,
			);
			if (isInCart) {
				throw new Error('Товар уже в корзине');
			}

			const updatedCart = [...user.cart, { productId }];

			console.log('addToCart: updatedCart:', updatedCart);

			const response = await fetch(
				`http://localhost:3000/users/${user.id}`,
				{
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ cart: updatedCart }),
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Ошибка при обновлении корзины: ${errorText}`);
			}

			const updatedUser = await response.json();
			localStorage.setItem('user', JSON.stringify(updatedUser));
			return updatedUser;
		} catch (error) {
			console.log('Ошибка в addToCart:', error.message);
			return rejectWithValue(error.message);
		}
	},
);

export const removeFromCart = createAsyncThunk(
	'auth/removeFromCart',
	async function (productId, { getState, rejectWithValue }) {
		try {
			const { auth } = getState();
			const user = auth.user;
			if (!user) {
				throw new Error('Пользователь не авторизован');
			}

			const updatedCart = user.cart.filter(
				(item) => item.productId !== productId,
			);

			console.log('removeFromCart: updatedCart:', updatedCart);

			const response = await fetch(
				`http://localhost:3000/users/${user.id}`,
				{
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ cart: updatedCart }),
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Ошибка при обновлении корзины: ${errorText}`);
			}

			const updatedUser = await response.json();
			localStorage.setItem('user', JSON.stringify(updatedUser));
			return updatedUser;
		} catch (error) {
			console.log('Ошибка в removeFromCart:', error.message);
			return rejectWithValue(error.message);
		}
	},
);

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

			if (existingUser.length > 0) {
				throw new Error('Пользователь с таким email уже существует');
			}

			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					password,
					role: 'user',
					cart: [],
				}),
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
			const parsedUser = JSON.parse(user);
			const response = await fetch(
				`http://localhost:3000/users/${parsedUser.id}`,
			);
			if (!response.ok) {
				throw new Error('Пользователь не найден на сервере');
			}
			const serverUser = await response.json();
			localStorage.setItem('user', JSON.stringify(serverUser));
			return serverUser;
		} catch (error) {
			localStorage.removeItem('user');
			return rejectWithValue(error.message);
		}
	},
);

const authSlice = createSlice({
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
			.addCase(restoreAuth.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(restoreAuth.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.user = action.payload;
			})
			.addCase(restoreAuth.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
				state.user = null;
			})
			.addCase(addToCart.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.user = action.payload;
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(removeFromCart.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.user = action.payload;
			})
			.addCase(removeFromCart.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
