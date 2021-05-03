import React, { useEffect } from 'react';

import FormInput from '../inputs/FormInput';

import Backdrop from '../Backdrop';

import Form from '../Form';

import Modal from '../Modal';

import { useProfile } from '../../context/profileContext';

import useForm from '../../hooks/useForm';

import { isEmpty } from '../../util/isEmpty';

export default (props) => {
	const { addRestrictions } = useProfile();

	const checkErrors = (vals) => {
		const errors = {};
		return errors;
	};

	const { handleChange, handleSubmit, values, errors } = useForm(
		addRestrictions,
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
				title='Edit Restrictions'
				// acceptEnabled={state.formIsValid}
				onCancelModal={() => props.onCancelModal(props.mode)}
				onAcceptModal={handleSubmit}
			>
				<Form>
					{renderErrors()}
					<div className='section_header'>
						<h3>Please add one dietary restriction at a time</h3>
					</div>
					<FormInput
						type='textarea'
						label='Restrictions'
						name='restrictions'
						id='restrictions'
						onChange={handleChange}
						value={values.restrictions || ''}
						errors={errors}
						prompt='Example: Siliac, Vegan, Gluten-free'
					/>
				</Form>
			</Modal>
		</>
	);
};
