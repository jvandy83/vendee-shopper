import React, { useContext, createContext, useEffect, useState } from 'react';

import { useAuth } from './authContext';

import { BASE_URL } from './config';

const ProfileContext = createContext();

import axios from 'axios';

const ProfileProvider = ({ children }) => {
	const { accessToken } = useAuth();

	const [loading, setLoading] = useState(false);

	const addRestrictions = async (values) => {
		axios({
			method: 'put',
			url: `http://localhost:5000/api/v1/profile/add-restrictions`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			data: values,
		}).then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				console.log('unable to add restrictions');
			}
			console.log(
				'restrictions inside addRestrictions in profileContext',
				res.data,
			);
		});
	};

	const addProfile = async (values) => {
		const res = await axios({
			method: 'put',
			url: `${BASE_URL}/profile/add-profile`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			data: values,
		});
		if (res.status !== 200 && res.status !== 201) {
			console.error('Unable to submit profile form');
		}
		window.location.reload(false);
		console.log('inside profileProvider values', res.data);
	};

	const getProfile = async () => {
		setLoading(true);
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}/profile/get-profile`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (res.status !== 200 && res.status !== 201) {
			console.error('Unable to submit profile form');
		}
		setProfile(res.data.profile);
		setLoading(false);
		console.log('inside profileProvider values', res.data);
	};
	return (
		<ProfileContext.Provider
			value={{ addProfile, getProfile, addRestrictions }}
		>
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
