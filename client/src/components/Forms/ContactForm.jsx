import React, { useEffect } from 'react';

import FormInput from '../inputs/FormInput';

import Backdrop from '../Backdrop';

import Form from '../Form';

import Modal from '../Modal';

import { useProfile } from '../../context/profileContext';

import useForm from '../../hooks/useForm';

import { isEmpty } from '../../util/isEmpty';

export default (props) => {
	const { addProfile } = useProfile();

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

	return (
		<>
			<Backdrop onClick={() => props.onCancelModal(props.mode)} />
			<Modal
				title='Edit Contact'
				// acceptEnabled={state.formIsValid}
				onCancelModal={() => props.onCancelModal(props.mode)}
				onAcceptModal={handleSubmit}
			>
				<Form>
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
				</Form>
			</Modal>
		</>
	);
};
