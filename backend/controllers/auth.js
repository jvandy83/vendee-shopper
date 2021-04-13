import User from '../models/User.js';

import { createRefreshToken, createAccessToken } from '../utils/auth.js';

import { __prod__ } from '../constants.js';

import argon2 from 'argon2';

export const register = async (req, res, next) => {
	const { email, password, fullName } = req.body;
	try {
		const doc = await User.findOne({ email: email }).exec();
		if (doc) {
			return res.status(400).json({
				message: 'Please use a different email',
			});
		}
		const hash = await argon2.hash(password);
		const user = new User({ email, password: hash, fullName });
		// await user.save();

		// createRefreshToken returns
		// a cookie so it accepts response param
		createRefreshToken(res, user);

		return res.status(200).json({
			// createAccessToken returns plain jsonwebtoken
			token: createAccessToken(user),
		});
	} catch (err) {
		console.error(err);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const doc = await User.findOne({ email });
		if (!doc) {
			return res.status(400).json({
				message: 'Email or password is incorrect',
			});
		}
		console.log('doc inside signin controller', doc);
		const decoded = await argon2.verify(doc.password, password);
		if (!decoded) {
			return res.status(400).json({
				message: 'Email or password is incorrect',
			});
		}
		return res.status(200).json({
			message: 'Success',
		});
	} catch (err) {
		console.error(err);
	}
};

export const me = (req, res, next) => {
	console.log((req.user && req.user) || 'User is not set on req object');

	const user = User.findById(req.user).exec();
	if (!user) {
		return res.status(403).json({
			message: 'User does not exist with that id',
		});
	}
	return res.status(200).json({
		message: 'Success',
		user,
	});
};

export const fetchRefreshToken = (req, res, next) => {
	console.log(req.headers);
	return res.json({
		message: 'Success',
	});
};
