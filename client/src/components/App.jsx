import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Home from '../pages/Home.jsx';
import Register from '../pages/Register.jsx';
import SignIn from '../pages/SignIn.jsx';
import Profile from '../pages/Profile.jsx';

import { Route, Switch } from 'react-router-dom';

import '../styles/App.scss';

export default (props) => {
	return (
		<div className='app_root'>
			<Navbar />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route
					path='/register'
					render={(routeProps) => <Register {...routeProps} />}
				/>
				<Route
					path='/signin'
					render={(routeProps) => <SignIn {...routeProps} />}
				/>
				<Route
					path='/profile'
					render={(routeProps) => <Profile {...routeProps} />}
				/>
			</Switch>
		</div>
	);
};
