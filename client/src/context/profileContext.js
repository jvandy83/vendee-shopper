import React, { useContext, createContext, useEffect } from 'react';

import { BASE_URL } from './config';

const ProfileContext = createContext();

import axios from 'axios';

const ProfileProvider = ({ children }) => {
	const addProfile = async (values) => {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}/profile/add-profile`,
			data: values,
		});
		if (res.status !== 200 && res.status !== 201) {
			console.error('Unable to submit profile form');
		}
		console.log('inside profileProvider values', res.data);
	};
	return (
		<ProfileContext.Provider value={{ addProfile }}>
			{children}
		</ProfileContext.Provider>
	);
};

const useProfile = () => {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error(`useProfile must be used inside ProfileProvider`);
	}
	return context;
};

export { ProfileProvider, useProfile };
