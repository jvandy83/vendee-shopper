import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/authContext';

import { isEmpty } from '../util/isEmpty';

import '../styles/Navbar.scss';

export default () => {
	const { user } = useAuth();
	const renderNav = () => {
		return !isEmpty(user) ? (
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
						<Link className='nav_list__item-link' to='#'>
							About
						</Link>
					</li>
					<li className='nav_list__item'>
						<Link className='nav_list__item-link' to='/profile'>
							Profile
						</Link>
					</li>
				</ul>
			</nav>
		) : (
			<nav>
				<ul className='nav_list'>
					<li className='nav_list__item'>
						<Link className='nav_list__item-link' to='/'>
							Vendee Shopper
						</Link>
					</li>
				</ul>
			</nav>
		);
	};

	return renderNav();
};
