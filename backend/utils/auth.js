import jwt from 'jsonwebtoken';
const { sign } = jwt;

export const createAccessToken = (user) => {
	return sign(
		{
			user: user._id,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '15m',
		},
	);
};

export const createRefreshToken = (res, user) => {
	return res.cookie(
		'qid',
		sign({ user: user._id }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '7d',
		}),
		{
			httpOnly: true,
		},
	);
};
