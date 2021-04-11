import React from 'react';

import '../styles/Form.scss';

export default ({ children }, ...props) => {
	return (
		<form autoComplete='password' className='form_root'>
			{children}
		</form>
	);
};
