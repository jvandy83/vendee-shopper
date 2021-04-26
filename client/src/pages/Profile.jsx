import React, { useEffect, useState } from 'react';

import FormInput from '../components/inputs/FormInput.jsx';

import Form from '../components/Form.jsx';

import Select from '../components/inputs/Select.jsx';

import useForm from '../hooks/useForm.js';

import Button from '../components/Button';

import data from '../components/inputs/selectData.js';

import { isEmpty } from '../util.js';

import { useGreeting } from '../hooks/useGreeting';

import { useAuth } from '../context/authContext';
import { useProfile } from '../context/profileContext';

import '../styles/Profile.scss';
import '../styles/Spinner.scss';

export default () => {
	const { user } = useAuth();
	const { addProfile } = useProfile();
	const greeting = useGreeting();

	const checkErrors = (vals) => {
		const errors = {};
		return errors;
	};
	const { handleChange, handleSubmit, values, errors } = useForm(
		addProfile,
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
	const renderSelectOptions = () => {
		return data.map((d) => (
			<option key={d} value={d}>
				{d}
			</option>
		));
	};

	// if (loading) {
	// 	return (
	// 		<div className='lds-default'>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 			<div></div>
	// 		</div>
	// 	);
	// }

	return (
		<div className='profile_root'>
			<div className='profile_header'>
				<h1 className='profile_header__greeting'>
					{greeting}, {user && user.firstName}
				</h1>
				<p className='profile_header__description'>Let's build your profile </p>
			</div>
			<Form onSubmit={handleSubmit}>
				{renderErrors()}
				<div className='section_header'>
					<h3>Address</h3>
				</div>
				<FormInput
					type='text'
					label='Street'
					name='street'
					id='street'
					onChange={handleChange}
					value={values.street || ''}
					errors={errors}
				/>
				<FormInput
					type='text'
					label='City'
					name='city'
					id='city'
					onChange={handleChange}
					value={values.city || ''}
					errors={errors}
				/>
				<FormInput
					type='text'
					label='State'
					name='state'
					id='state'
					onChange={handleChange}
					value={values.state || ''}
					errors={errors}
					prompt='Example: CO, AL, IL'
				/>
				<FormInput
					type='text'
					label='Zipcode'
					name='zipcode'
					id='zipcode'
					onChange={handleChange}
					value={values.zipcode || ''}
					errors={errors}
				/>
				<div className='divider'></div>
				<FormInput
					type='text'
					label='Phone Number '
					name='phoneNumber'
					id='phoneNumber'
					onChange={handleChange}
					value={values.phoneNumber || ''}
					errors={errors}
				/>
				<div className='divider'></div>
				<Select
					label='Dietary Restrictions '
					name='dietaryRestrictions'
					id='dietaryRestrictions'
					defaultText='--Choose any dietary restrictions--'
					onChange={handleChange}
				>
					{renderSelectOptions()}
				</Select>

				<Button type='submit' value='Save' control='primary' />
			</Form>
		</div>
	);
};
