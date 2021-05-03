import React, { useEffect, useState } from 'react';

import ContactCard from '../components/Card/ContactCard';
import RestrictionsCard from '../components/Card/RestrictionsCard';

import ContactForm from '../components/Forms/ContactForm';
import RestrictionsForm from '../components/Forms/RestrictionsForm';

import { useGreeting } from '../hooks/useGreeting';

import { useAuth } from '../context/authContext';

import '../styles/Profile.scss';
import '../styles/Spinner.scss';

const EDIT_MODE = {
	editContact: false,
	editRestrictions: false,
};

export default () => {
	const { user, accessToken, loading } = useAuth();

	const greeting = useGreeting();

	const [editMode, setEditMode] = useState(EDIT_MODE);

	const onEditHandler = (mode) => {
		setEditMode((prev) => ({
			...prev,
			[mode]: true,
		}));
	};

	const cancelEditHandler = (mode) => {
		setEditMode((prev) => ({
			...prev,
			[mode]: false,
		}));
	};

	// useEffect(() => {
	// });
	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className='profile_root'>
			<div className='profile_header'>
				<h1 className='profile_header__greeting'>
					{greeting}, {user.firstName}
				</h1>
				<p className='profile_header__description'>Let's build your profile </p>
			</div>
			{editMode.editContact ? (
				<ContactForm onCancelModal={cancelEditHandler} mode='editContact' />
			) : (
				<ContactCard
					onEditHandler={onEditHandler}
					mode='editContact'
					title='Edit Contact'
				/>
			)}
			{editMode.editRestrictions ? (
				<RestrictionsForm
					onCancelModal={cancelEditHandler}
					mode='editRestrictions'
				/>
			) : (
				<RestrictionsCard
					onEditHandler={onEditHandler}
					mode='editRestrictions'
					title='Edit Diet Restrictions'
				/>
			)}
		</div>
	);
};
