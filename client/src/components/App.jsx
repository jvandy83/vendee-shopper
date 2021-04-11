import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Home from '../pages/Home.jsx';
import Register from '../pages/Register.jsx';
import SignIn from '../pages/SignIn.jsx';
import Profile from '../pages/Profile.jsx';

import axios from 'axios';

import '../styles/App.scss';

import { Route, Switch } from 'react-router-dom';

export default () => {
	const [appUser, setUser] = useState({});
	const [signedIn, setSignedIn] = useState(false);
	const [registered, setRegister] = useState(false);
	const handleSignIn = () => {
		setSignedIn(true);
	};
	const handleSignOut = () => {
		setSignedIn(false);
	};
	const handleRegister = async (values) => {
		try {
			const res = await axios({
				url: `http://localhost:5000/v1/api/auth/register`,
				method: 'post',
				data: { ...values },
				withCredentials: true,
			});
			if (res.status === 200 || res.status === 201) {
				console.log(res.data);
				console.log('New user was added');
				setUser(res.data.user);
				setRegister(true);
			}
		} catch (err) {
			console.error(err);
		}
	};

	// useEffect(() => {
	// 	axios(`http://localhost:5000/v1/api/auth/me${id}`).then(async (res) => {
	// 		const user = res.data.user;
	// 		if (!user) {
	// 			console.log('No user is currently signed in');
	// 		}
	// 		setUser(user);
	// 	});
	// });

	return (
		<div className='app_root'>
			<Navbar isAuth={signedIn} handleSignOut={handleSignOut} />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route
					path='/register'
					render={(routeProps) => (
						<Register
							handleRegister={handleRegister}
							isSignedIn={signedIn}
							{...routeProps}
							isRegistered={registered}
						/>
					)}
				/>
				<Route
					path='/signin'
					render={(routeProps) => (
						<SignIn
							isSignedIn={signedIn}
							handleSignIn={handleSignIn}
							{...routeProps}
						/>
					)}
				/>
				<Route
					path='/profile'
					render={(routeProps) => <Profile appUser={appUser} {...routeProps} />}
				/>
			</Switch>
		</div>
	);
};
