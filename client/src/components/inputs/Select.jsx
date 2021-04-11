import React from 'react';

export default (props) => {
	return (
		<>
			<label>{props.label}</label>
			<select name={props.name} id={props.id}>
				{/* define default option value and text */}
				<option value={props.value}>{props.defaultText}</option>
				{props.children}
			</select>
		</>
	);
};
