import React from 'react';

import '../styles/Button.scss';

export default ({ children, design, mode, onClick }) => {
	const className = [`button button--${design}`, `button--${mode}`].join(' ');
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};
