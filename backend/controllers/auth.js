import User from '../models/User.js';
import jwt from 'jsonwebtoken';

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
		await user.save();
		const cookie = jwt.sign(
			{
				user: user._id,
			},
			'secret',
		);
		res.cookie('qid', cookie);
		return res.status(200).json({
			message: 'A new user has been added',
			user,
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

export const me = async (req, res, next) => {
	const id = req.query.id;
	const user = User.findById(id).exec();
	if (!user) {
		return res.status(400).json({
			message: 'User does not exist with that id',
		});
	}
	return res.status(200).json({
		message: 'Success',
		user,
	});
};
