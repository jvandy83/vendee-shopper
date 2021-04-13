import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const isAuth = async (req, res, next) => {
	const authorization = req.headers['authorization'];

	if (!authorization) {
		throw new Error('Not authenticated');
	}

	try {
		const token = authorization.split(' ')[1];

		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);

		req.user = payload.user;
	} catch (err) {
		console.error(err);
		throw new Error('Not authenticated');
	}

	return next();
};
