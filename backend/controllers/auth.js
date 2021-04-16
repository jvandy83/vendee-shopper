import User from '../models/User.js';

import {
	createRefreshToken,
	createAccessToken,
	sendRefreshToken,
	verifyToken,
} from '../utils/auth.js';

import { __prod__ } from '../constants.js';

import argon2 from 'argon2';

export const register = async (req, res, next) => {
	const { email, password, fullName, tokenVersion } = req.body;
	try {
		const doc = await User.findOne({ email: email });
		if (doc) {
			return res.status(400).json({
				message: 'Please use a different email',
			});
		}
		const hash = await argon2.hash(password);
		const user = new User({ email, password: hash, fullName, tokenVersion });
		await user.save();

		res.status(200).json({
			message: 'Successfully added a new user',
			user,
		});
	} catch (err) {
		console.error(err);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;
	console.log(email, password);
	try {
		const user = await User.findOne({ email }).exec();
		if (!user) {
			return res.status(400).json({
				message: 'Email or password is incorrect',
			});
		}

		const decoded = await argon2.verify(user.password, password);
		if (!decoded) {
			return res.status(400).json({
				message: 'Email or password is incorrect',
			});
		}
		// createRefreshToken returns
		// a cookie so it accepts response param
		sendRefreshToken(res, createRefreshToken(user));

		return res.status(200).json({
			// createAccessToken returns plain jsonwebtoken
			token: createAccessToken(user),
			user,
		});
	} catch (err) {
		console.error(err);
	}
};

export const me = async (req, res, next) => {
	console.log((req.user && req.user) || 'User is not set on req object');

	const user = await User.findById(req.user);
	if (!user) {
		return res.status(401).json({
			message: 'User does not exist with that id',
		});
	}
	return res.status(200).json({
		message: 'Success',
		user,
	});
};

export const fetchRefreshToken = async (req, res, next) => {
	const token = req.cookies.qid;

	if (!token) {
		return res.status(403).json({
			ok: false,
			accessToken: '',
			message: 'not authorized',
		});
	}

	let payload;

	try {
		// payload value === { user: user._id }
		payload = verifyToken(token);
	} catch (err) {
		console.error(err);

		res.json({
			error: err,
			accessToken: '',
			message: 'not authorized',
		});
	}

	const user = await User.findById(payload.user);

	if (!user) {
		res.status(401).json({
			message: 'User not found',
			accessToken: '',
			message: 'no user found',
		});
	}

	if (user.tokenVersion !== payload.tokenVersion) {
		return res.status(403).json({
			ok: false,
			accessToken: '',
			message: 'bad token',
		});
	}

	sendRefreshToken(res, createRefreshToken(user));

	return res.status(200).json({
		message: 'Success',
		token: createAccessToken(user),
		user,
	});
};

export const revokeRefreshToken = async (req, res, next) => {
	console.log(req.headers);
	let doc;
	try {
		doc = await User.findOneAndUpdate(
			{ _id: req.user },
			{ $inc: { tokenVersion: 1 } },
			{ new: true },
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Server Error',
		});
	}
	console.log(doc);
	return res.status(200).json({
		message: 'User has been logged out',
	});
};
