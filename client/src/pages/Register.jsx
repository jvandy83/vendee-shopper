import React from 'react';
import { Redirect } from 'react-router-dom';
import FormInput from '../components/inputs/FormInput.jsx';

import Button from '../components/Button.jsx';

import useForm from '../hooks/useForm.js';

import { useAuth } from '../context/authContext';

import { isEmpty } from '../util.js';

import '../styles/Register.scss';

export default (props) => {
	const { register } = useAuth();
	const checkErrors = (vals) => {
		const errors = {};
		const { email, password } = vals;
		if (email && email.length < 3) {
			errors.email = 'Email must be longer than 3 characters';
		}
		if (password && password.length < 5) {
			errors.password = 'Password must be longer than 5 characters';
		}
		return errors;
	};

	const { handleChange, handleSubmit, errors, values } = useForm(
		register,
		checkErrors,
	);

	const renderErrors = () => {
		if (isEmpty(errors)) {
			return null;
		}
		return (
			<>
				{Object.values(errors).map((e) => {
					return <p key={e}>{e}</p>;
				})}
			</>
		);
	};

	// if (props.isRegistered) {
	// 	return <Redirect to='/profile' />;
	// }

	return (
		<div className='register_root'>
			<div className='register_title'>
				<h2>Register</h2>
			</div>
			<form onSubmit={handleSubmit}>
				{renderErrors()}
				<FormInput
					type='fullName'
					label='Full Name '
					name='fullName'
					id='fullName'
					onChange={handleChange}
					value={values.fullName || ''}
					errors={errors}
				/>
				<FormInput
					type='email'
					label='Email '
					name='email'
					id='email'
					onChange={handleChange}
					value={values.email || ''}
					errors={errors}
				/>
				<FormInput
					type='password'
					label='Password'
					name='password'
					id='password'
					onChange={handleChange}
					value={values.password || ''}
					errors={errors}
				/>
				<Button control='primary' type='submit' value='submit' />
			</form>
		</div>
	);
};
