import React from 'react';

import { Redirect } from 'react-router-dom';

import FormInput from '../components/inputs/FormInput';

import Button from '../components/Button';

import useForm from '../hooks/useForm';

import { isEmpty } from '../util';

import { useAuth } from '../context/authContext';

import '../styles/SignIn';

export default () => {
	const { login, isLoggedIn } = useAuth();

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
		login,
		checkErrors,
	);

	const renderErrors = () => {
		if (isEmpty(errors)) {
			return null;
		}
		return (
			<>
				{Object.values(errors).map((e) => {
					return <p>{e}</p>;
				})}
			</>
		);
	};

	if (isLoggedIn) {
		return <Redirect to='/profile' />;
	}

	return (
		<div className='signin_root'>
			<div className='signin_title'>
				<h2>Welcome Back!</h2>
			</div>
			<form onSubmit={handleSubmit}>
				{renderErrors()}
				<FormInput
					type='email'
					label='Email '
					name='email'
					id='email'
					onChange={handleChange}
					value={values.email || ''}
				/>
				<FormInput
					type='password'
					label='Password '
					name='password'
					id='password'
					onChange={handleChange}
					value={values.password || ''}
				/>
				<div className='button_container'>
					<Button type='submit' value='submit' control='primary' />
				</div>
			</form>
		</div>
	);
};
