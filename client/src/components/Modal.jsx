import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

import '../styles/Modal.scss';

const Modal = (props) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	return (
		<div className='modal'>
			<header className='modal-header'>
				<h2>{props.title}</h2>
			</header>
			<hr />
			<div className='modal-content'>{props.children}</div>
			{!props.type ? (
				<div className='modal-actions'>
					<Button design='danger' mode='flat' onClick={props.onCancelModal}>
						Cancel
					</Button>
					<Button
						// disabled={props.acceptEnabled}
						mode='raised'
						onClick={props.onAcceptModal}
						loading={props.isLoading}
					>
						Save
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default Modal;
