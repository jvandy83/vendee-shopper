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
					<Link className='nav_list__item-link' to='#'>
						Contact
					</Link>
				</li>
				<li className='nav_list__item'>
					<button onClick={me} className='nav_list__item-link' to='#'>
						About
					</button>
				</li>
				<li className='nav_list__item'>
					<Link className='nav_list__item-link' to='/profile'>
						Profile
					</Link>
				</li>
				<Button value='Sign out' control='unfilled' action={logout} />
			</ul>
		</nav>
	) : (
		<nav className='nav_root'>
			<div className='nav_icon__container'>
				<Link className='nav_list__item-link nav-icon' to='/'>
					Vendee Shopper
				</Link>
			</div>
			<Link to='/signin'>
				<Button value='Sign in' control='unfilled' />
			</Link>
		</nav>
	);
};
