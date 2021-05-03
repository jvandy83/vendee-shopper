import Profile from '../models/Profile.js';
import User from '../models/User.js';

export const addProfile = async (req, res, next) => {
	console.log('inside addProfile controller');
	/*
		street: String,
		city: String,
		state: String,
		zipcode: Number,
		phoneNumber: String
	*/
	const { street, city, state, zipcode, phoneNumber } = req.body;

	const updatedContact = {};
	if (street) updatedContact.street = street;
	if (city) updatedContact.city = city;
	if (state) updatedContact.state = state;
	if (zipcode) updatedContact.zipcode = zipcode;
	if (phoneNumber) updatedContact.phoneNumber = phoneNumber;

	try {
		const profileDoc = await Profile.findOne({ user: req.user });

		console.log('profileDoc', profileDoc);

		if (!profileDoc) {
			const newProfile = new Profile({
				...updatedContact,
				user: req.user,
			});

			await newProfile.save();

			console.log('inside newProfileDoc', newProfile);

			return res.status(200).json({
				message: 'Successfully created profile',
			});
		}
		await Profile.updateOne({ _id: profileDoc._id }, updatedContact, {
			new: true,
		});

		return res.status(201).json({
			message: 'Successfully updated profile',
			profile: profileDoc,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Server error',
		});
	}
};

export const getProfile = async (req, res, next) => {
	console.log('inside getProfile controller');
	try {
		const profile = await Profile.findOne({ user: req.user });
		return res.status(200).json({
			profile,
		});
	} catch (err) {
		console.error(err);
	}
};
