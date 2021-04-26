import React from 'react';

import '../styles/Button.scss';

export default ({ value, control, action }) => {
	return (
		<button className={`btn-${control}`} onClick={action}>
			{value}
		</button>
	);
};
