import React from 'react';
import { Redirect } from 'react-router-dom';
import FormInput from '../components/inputs/FormInput';

import Button from '../components/Button';

import Form from '../components/Form';

import useForm from '../hooks/useForm';

import { useAuth } from '../context/authContext';

import { isEmpty } from '../util';

import '../styles/Register';

export default () => {
	const { register, loading, accessToken } = useAuth();
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

	const log = (obj) => console.log(obj);

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

	if (!loading && accessToken) {
		return <Redirect to='/profile' />;
	}

	return (
		<div className='register_root'>
			<div className='register_title'>
				<h2>Register</h2>
			</div>
			<Form>
				{renderErrors()}
				<label>Name</label>
				<div className='name_input__container'>
					<FormInput
						type='firstName'
						name='firstName'
						id='firstName'
						onChange={handleChange}
						value={values.firstName || ''}
						errors={errors}
						prompt='First'
					/>
					<FormInput
						type='lastName'
						name='lastName'
						id='lastName'
						onChange={handleChange}
						value={values.lastName || ''}
						errors={errors}
						prompt='Last'
					/>
				</div>
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
				<FormInput
					type='password'
					label='Confirm Password'
					name='confirmPassword'
					id='confirmPassword'
					onChange={handleChange}
					value={values.confirmPassword || ''}
					errors={errors}
				/>
				<Button design='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};
