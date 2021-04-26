import React from 'react';

import '../../styles/FormInput.scss';

export default ({
	type,
	label,
	name,
	id,
	onChange,
	value,
	errors,
	placeholder,
	prompt,
}) => {
	const className = [
		'input_field',
		errors && Object.keys(errors).some((e) => e === name) ? 'input_error' : '',
	].join(' ');
	return (
		<div className='input_field__container'>
			<label>{label}</label>
			<input
				type={type}
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			<p className='input_prompt'>{prompt}</p>
		</div>
	);
};
