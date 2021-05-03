import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const isAuth = async (req, res, next) => {
	const authorization = req.headers['authorization'];

	if (!authorization) {
		return res.status(401).json({
			message: 'Missing accessToken',
		});
	}

	try {
		const token = authorization.replace('Bearer ', '');

		console.log('accessToken inside auth middleware', token);

		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);

		req.user = payload.user;
	} catch (err) {
		console.error(err);
		return res.status(401).json({
			message: 'Invalid accessToken',
		});
	}

	return next();
};
