import DietRestrictions from '../models/DietRestrictions.js';

export const addRestrictions = async (req, res, next) => {
	const { restrictions } = req.body;

	const restrictionsDocument = await DietRestrictions.findOne({
		user: req.user,
	});

	let updatedRestrictions = {};
	if (restrictions) updatedRestrictions.restrictions = restrictions;

	if (!restrictionsDocument) {
		restrictionsDocument.push(restrictions);
		restrictionsDocument.save();
		return res.status(200).json({
			message: 'Success',
			restrictions: restrictionsDocument,
		});
	}

	await DietRestrictions.findOneAndUpdate(
		{ user: req.user },
		updatedRestrictions,
		{
			new: true,
		},
	);

	return res.status(201).json({
		message: 'Success',
		updatedRestrictions,
	});
};
