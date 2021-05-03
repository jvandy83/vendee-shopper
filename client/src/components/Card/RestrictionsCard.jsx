import React, { useEffect, useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';

import { useAuth } from '../../context/authContext';

import axios from 'axios';

import '../../styles/ContactCard.scss';

export default (props) => {
	const { accessToken } = useAuth();
	const [restrictions, setRestrictions] = useState({});
	const [loading, setLoading] = useState(false);

	const handleEditClick = () => {
		props.onEditHandler(props.mode);
	};

	// create axios call to populate
	// profileCard with profile data

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5000/api/v1/profile/get-restrictions`)
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					console.log('Could not get diet restrictions');
				}
				console.log(res.data);
				// setRestrictions(req.data.restrictions);
				setLoading(false);
			});
	}, []);

	// console.log(
	// 	'restrictions inside restrictions component',
	// 	restrictions && restrictions,
	// );

	if (loading) {
		return <div>Loading...</div>;
	}

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
				<h4 className='card-content__header'>Restrictions</h4>
				<p className='card-content__field'>Siliac</p>
			</div>
		</>
	);
};
