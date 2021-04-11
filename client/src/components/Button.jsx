import React from 'react';

import '../styles/Button.scss';

export default ({ type, value, control }) => {
	return (
		<button className={`btn-${control}`} type={type}>
			{value}
		</button>
	);
};
