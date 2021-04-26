import User from '../models/User.js';

import {
	createRefreshToken,
	createAccessToken,
	sendRefreshToken,
	verifyToken,
} from '../utils/auth.js';

import argon2 from 'argon2';

export const register = async (req, res, next) => {
	console.log(req.body);
	const { email, password, firstName, lastName } = req.body;
	try {
		const doc = await User.findOne({ email });
		if (doc) {
			return res.status(401).json({
				message: 'Please use a different email',
			});
		}
		const hash = await argon2.hash(password);
		const user = new User({
			email,
			password: hash,
			firstName,
			lastName,
		});
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
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: 'Email or password is incorrect',
			});
		}

		const decoded = await argon2.verify(user.password, password);
		if (!decoded) {
			return res.status(401).json({
				message: 'Email or password is incorrect',
			});
		}
		// sendRefreshToken returns
		// a cookie with payload === { user: user._id }
		// so it accepts response arg
		// and user arg
		sendRefreshToken(res, createRefreshToken(user));

		return res.status(200).json({
			// createAccessToken returns jsonwebtoken
			// with payload === { user: user._id }
			// so takes user arg
			token: createAccessToken(user),
			user,
		});
	} catch (err) {
		console.error(err);
	}
};

export const me = async (req, res, next) => {
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
	const refreshToken = req.cookies['refresh_token'];

	if (!refreshToken) {
		return res.status(401).json({
			accessToken: '',
			message: 'refreshToken not present in request',
		});
	}

	let payload;

	try {
		// payload = { user: user._id }
		payload = verifyToken(refreshToken);
	} catch (err) {
		console.error(err);

		res.json({
			error: err,
			accessToken: '',
			message: 'refreshToken payload not valid',
		});
	}

	const user = await User.findById(payload.user);

	if (!user) {
		res.status(401).json({
			message: 'User not found',
			accessToken: '',
		});
	}

	/* 
	- check tokenVersion in mongoDB
		against current cookie token version

	- if version has been incremented
		we intentionally logged out
		user due to account being hacked
		or some other deliberate reason
	*/

	if (user.tokenVersion !== payload.tokenVersion) {
		return res.status(401).json({
			accessToken: '',
			message: 'token version is not valid',
		});
	}

	// we have a valid token
	// send back new REFRESH_TOKEN value

	sendRefreshToken(res, createRefreshToken(user));

	// send back a new ACCESS_TOKEN value

	return res.status(200).json({
		message: 'Success',
		token: createAccessToken(user),
		user,
	});
};

export const logout = (req, res, next) => {
	// sendRefreshToken(res, createRefreshToken(user));
	console.log('inside logout controller');
	res.cookie('refresh_token', '', {
		httpOnly: true,
		maxAge: new Date(0),
	});
	return res.status(200).json({
		message: 'Logged out',
		accessToken: '',
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
	return res.status(200).json({
		message: 'User has been logged out',
	});
};
