import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

export const createAccessToken = (user) => {
	return sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '5s',
	});
};

export const createRefreshToken = (user) => {
	return sign(
		{ user: user._id, tokenVersion: user.tokenVersion },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: '7d',
		},
	);
};

export const verifyToken = (token) => {
	return verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export const sendRefreshToken = (res, token) => {
	res.cookie('refresh_token', token, { httpOnly: true });
};
