import React from 'react';

import '../../styles/FormInput.scss';

export default ({ type, label, name, id, onChange, value, errors }) => {
	const className = [
		'input_field',
		errors && Object.keys(errors).some((e) => e === name) ? 'input_error' : '',
	];
	return (
		<div className='input_field__container'>
			<label htmlFor={name}>{label}</label>
			<input
				autoComplete='nope'
				type={type}
				className={className}
				name={name}
				id={id}
				value={value || ''}
				onChange={onChange}
			/>
		</div>
	);
};
