import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Navbar.scss';

export default (props) => {
	return props.isAuth ? (
		<nav>
			<ul>
				<li>
					<Link to='/'>Vendee Shopper</Link>
				</li>
				<li>
					<Link to='#'>Contact</Link>
				</li>
				<li>
					<Link to='#'>About</Link>
				</li>
				<li>
					<Link to='#'>Profile</Link>
				</li>
			</ul>
		</nav>
	) : (
		<nav>
			<ul>
				<li>
					<Link to='/'>Vendee Shopper</Link>
				</li>
			</ul>
		</nav>
	);
};
