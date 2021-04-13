import React, { useEffect } from 'react';

import FormInput from '../components/inputs/FormInput.jsx';

import Form from '../components/Form.jsx';

import Select from '../components/inputs/Select.jsx';

import useForm from '../hooks/useForm.js';

import data from '../components/inputs/selectData.js';

import { isEmpty } from '../util.js';

import { useToken } from '../hooks/useToken.js';

import axios from 'axios';

import '../styles/Profile.scss';

export default (props) => {
	const { getAccessToken } = useToken();

	const log = (vals) => console.log(vals);
	const checkErrors = (vals) => {
		const errors = {};
		return errors;
	};
	const { handleChange, handleSubmit, values, errors } = useForm(
		log,
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

	return (
		<div className='profile_root'>
			<div className='profile_header'>
				<h1>Hello</h1>
				<h2 className='profile_header__title'>Build Your Custom Profile </h2>
			</div>
			<div className='profile_form__container'>
				<Form onSubmit={handleSubmit}>
					{renderErrors()}
					<FormInput
						type='text'
						label='Full Name '
						name='fullName'
						id='fullName'
						onChange={handleChange}
						value={values.fullName || ''}
						errors={errors}
					/>
					<FormInput
						type='text'
						label='Address '
						name='address'
						id='address'
						onChange={handleChange}
						value={values.address || ''}
						errors={errors}
					/>
					<FormInput
						type='text'
						label='Phone Number '
						name='phoneNumber'
						id='phoneNumber'
						onChange={handleChange}
						value={values.phoneNumber || ''}
						errors={errors}
					/>
					<Select
						label='Dietary Restrictions '
						name='dietaryRestrictions'
						id='dietaryRestrictions'
						defaultText='--Choose any dietary restrictions--'
					>
						{renderSelectOptions()}
					</Select>
				</Form>
			</div>
		</div>
	);
};
