import React, { useEffect, useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';

import { useAuth } from '../../context/authContext';

import axios from 'axios';

import '../../styles/ContactCard.scss';

export default (props) => {
	const { accessToken } = useAuth();
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(false);

	const handleEditClick = () => {
		props.onEditHandler(props.mode);
	};

	// create axios call to populate
	// profileCard with profile data

	useEffect(() => {
		setLoading(true);
		axios({
			method: 'get',
			url: `http://localhost:5000/api/v1/profile/get-profile`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}).then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				console.error('Unable to submit profile form');
			}
			setProfile(res.data.profile);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<div className='card'>
				<div className='card-header'>
					<h2>{props.title}</h2>
				</div>

				<div className='edit'>
					<EditIcon id='edit-icon' onClick={handleEditClick} />
				</div>
			</div>
			<div className='card-content'>
				<>
					<h4 className='card-content__header'>Address</h4>
					<p className='card-content__field'>{profile.street}</p>
					<p className='card-content__field'>
						{profile.city &&
							profile.city.slice(0, 1).toUpperCase() + profile.city.slice(1)}
						, {profile.state} {profile.zipcode}
					</p>
				</>
				<div>
					<h4 className='card-content__header'>Phone Number</h4>
					<p className='card-content__field'>{profile.phoneNumber}</p>
				</div>
			</div>
		</>
	);
};
