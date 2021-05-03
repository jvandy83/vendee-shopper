import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
	return ReactDOM.createPortal(
		<div
			className={['backdrop', props.open ? 'open' : ''].join(' ')}
			onClick={props.onClick}
		/>,
		document.getElementById('backdrop-root'),
	);
};

export default Backdrop;
