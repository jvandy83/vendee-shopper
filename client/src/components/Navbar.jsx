import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';

import { useAuth } from '../context/authContext';

import '../styles/Navbar.scss';

export default () => {
	const { logout, me, accessToken } = useAuth();

	return accessToken ? (
		<nav className='nav_root'>
			<div className='nav_icon__container'>
				<Link className='nav_list__item-link nav-icon' to='/'>
					Vendee Shopper
				</Link>
			</div>
			<ul className='nav_list'>
				<li className='nav_list__item'>
					<Link className='nav_list__item-link' to='/profile'>
						Profile
					</Link>
				</li>
				<Button design='unfilled' onClick={logout}>
					Sign out
				</Button>
			</ul>
		</nav>
	) : (
		<nav className='nav_root'>
			<div className='nav_icon__container'>
				<Link className='nav_list__item-link nav-icon' to='/'>
					Vendee Shopper
				</Link>
			</div>
			<div>
				<Link to='/signin'>
					<Button design='unfilled'>Sign in</Button>
				</Link>
				<Link to='/register'>
					<Button design='primary'>Register</Button>
				</Link>
			</div>
		</nav>
	);
};
