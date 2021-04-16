export const addProfile = (req, res, next) => {
	if (req.body) {
		console.log(req.body);
		return res.status(200).json({
			message: 'Success',
		});
	}
	return res.status(400).json({
		message: 'Failed to create profile',
	});
};
