import React, { createContext, useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { BASE_URL_AUTH } from './config';

import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const history = useHistory();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	// optimize axios interceptor to
	// not run so many times

	axios.interceptors.response.use(
		(res) => res,
		(err) => {
			if (err.response.status === 403 || err.response.status === 401) {
				console.log('err.response', err.response);
				axios({
					url: `${BASE_URL_AUTH}/refresh-token`,
					method: 'post',
					withCredentials: true,
				}).then((res) => {
					if (res.status !== 200 && res.status !== 201) {
						console.log('Unable to fetch user');
						setError(res.data.message);
					}
					console.log('axios interceptor worked!!!!!');
					setAccessToken(res.data.token);
					setUser(res.data.user);
				});
			}
			// return Promise.reject(err);
		},
	);

	useEffect(() => {
		console.log('inside useEffect authContext');
		axios({
			url: `${BASE_URL_AUTH}/refresh-token`,
			method: 'post',
			withCredentials: true,
		}).then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				console.log('Unable to fetch user');
			}
			setAccessToken(res.data.token);
			setUser(res.data.user);
			setLoading(false);
		});
	}, []);

	const register = async (values) => {
		setLoading(true);
		try {
			const res = await axios({
				url: `${BASE_URL_AUTH}/register`,
				method: 'post',
				data: values,
			});
			if (res.status !== 200 && res.status !== 201) {
				console.log('Unable to register user');
			}
		} catch (err) {
			console.error(err);
			const { message } = res.data;
			setError(message);
			setLoading(false);
		}
	};

	const login = async (values) => {
		setLoading(true);
		try {
			const res = await axios({
				url: `${BASE_URL_AUTH}/login`,
				method: 'post',
				data: values,
				withCredentials: true,
			});
			if (res.status !== 200 && res.status !== 201) {
				console.log('Login was unsuccessful');
				const { message } = res.data;
				setError(message);
			}
			setLoading(false);
			setAccessToken(res.data.token);
		} catch (err) {
			console.error(err);
		}
	};

	const me = async () => {
		try {
			const res = await axios({
				method: 'post',
				url: `${BASE_URL_AUTH}/me`,
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (res.status !== 200 && res.status !== 201) {
				console.log('Could not fetch user');
			}
			console.log('res.data inside me function', res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const logout = async () => {
		console.log('inside logout function');
		const res = await axios({
			method: 'post',
			url: `http://localhost:5000/api/v1/auth/logout`,
		});
		setAccessToken(res.data.accessToken);
		history.push('/');
	};

	if (!accessToken && loading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				register,
				accessToken,
				loading,
				error,
				user,
				logout,
				me,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`useAuth must be used in AuthProvider`);
	}
	return context;
};

export { AuthProvider, useAuth };
