import React from 'react';

import '../../styles/FormInput';

export default (props) => {
	return (
		<>
			<label>{props.label}</label>
			<select style={{ marginBottom: '1rem' }} name={props.name} id={props.id}>
				{/* define default option value and text */}
				<option value={props.value}>{props.defaultText}</option>
				{props.children}
			</select>
		</>
	);
};
