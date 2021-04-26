import React from 'react';

import '../styles/Form.scss';

export default ({ children, onSubmit }, ...props) => {
	return (
		<form onSubmit={onSubmit} className='form_root'>
			{children}
		</form>
	);
};
