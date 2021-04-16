import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { BASE_URL } from './config';

import { useToken } from '../hooks/useToken';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { setAccessToken, getAccessToken } = useToken();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios({
			url: `${BASE_URL}/refresh-token`,
			method: 'post',
		}).then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				console.log('Unable to fetch user');
				setError(res.data.message);
			}
			console.log('found user', res.data.user);
			setUser(res.data.user);
			setAccessToken(res.data.token);
			setLoading(false);
		});
	}, [setUser, setError]);

	const register = async (values) => {
		try {
			const res = await axios({
				url: `${BASE_URL}/register`,
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
		}
	};
	const login = async (values) => {
		setLoading(true);
		try {
			const res = await axios({
				url: `${BASE_URL}/login`,
				method: 'post',
				data: values,
			});
			if (res.status !== 200 && res.status !== 201) {
				console.log('Login was unsuccessful');
				const { message } = res.data;
				setError(message);
			}
			const { token } = res.data;
			setLoading(false);
			setAccessToken(token);
			setIsLoggedIn(true);
		} catch (err) {
			console.error(err);
		}
	};
	// const getAuth = async () => {
	// 	try {
	// 		const res = await axios({
	// 			url: `${BASE_URL}/me`,
	// 			method: 'post',
	// 			headers: {
	// 				Authorization: `Bearer ${getAccessToken()}`,
	// 			},
	// 		});
	// 		if (res.status !== 200 && res.status !== 201) {
	// 			console.log('User is not authorized');
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 		const { message } = res.data;
	// 		setError(message);
	// 	}
	// };
	const fetchRefreshToken = async () => {
		axios({
			url: `${BASE_URL}/refresh-token`,
			method: 'post',
		});
	};

	return (
		<AuthContext.Provider
			value={{ login, register, user, loading, error, isLoggedIn }}
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
