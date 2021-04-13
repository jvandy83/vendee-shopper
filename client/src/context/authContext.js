import React, { useContext, useEffect, useState } from 'react';

import { useToken } from '../hooks/useToken.js';

const AuthContext = React.createContext();

import axios from 'axios';

const AuthProvider = (props) => {
	const { getAccessToken, setAccessToken } = useToken();

	const [isLoggedIn, setLoggedIn] = useState(false);

	const [user, setUser] = useState({});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		isLoggedIn &&
			!loading &&
			axios
				.post(`http://localhost:5000/v1/api/auth/me`, null, {
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				})
				.then(async (res) => {
					const { user } = await res.data;
					console.log(user);
				});
	}, [getAccessToken, isLoggedIn, loading]);

	const register = async (values) => {
		setLoading(true);
		try {
			const res = await axios({
				url: `http://localhost:5000/v1/api/auth/register`,
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
				method: 'post',
				data: { ...values },
				withCredentials: true,
			});
			const { token } = await res.data;
			if (res.status !== 200 && res.status !== 201) {
				console.log('Unable to register user');
			} else {
				setLoggedIn(true);
				setAccessToken(token);
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const login = async (values) => {
		setLoading(true);
		try {
			const res = await axios({
				url: `http://localhost:5000/v1/api/auth/register`,
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
				method: 'post',
				data: { ...values },
				withCredentials: true,
			});
			const { user, token } = await res.data;
			if (res.status !== 200 && res.status !== 201) {
				console.log('Unable to register user');
			} else {
				setLoggedIn(true);
				setAccessToken(token);
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const logout = () => {
		// add some logic to logout
		// like removing refresh or
		// access token
	};

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<AuthContext.Provider
			value={{ register, login, user, loading }}
			{...props}
		/>
	);
};

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`);
	}
	return context;
}

export { AuthProvider, useAuth };
