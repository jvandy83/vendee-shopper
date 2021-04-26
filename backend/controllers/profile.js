export const addProfile = (req, res, next) => {
	/*
		address: {
		street: String,
		city: String,
		state: String,
		zipcode: Number,
	},
	contact: {
		phoneNumber: String,
		hidden: {
			type: Boolean,
			default: true,
		},
	},
	restrictions: {
		celiac: Boolean,
		lactose: Boolean,
		diabetic: Boolean,
		kosher: Boolean,
		peanut: Boolean,
		vegan: Boolean,
	}
	*/
	const { street, city, state, zipcode, phoneNumber, restrictions } = req.body;

	const address = {};
	const contact = {};
	const restrictedFoods = {};
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
