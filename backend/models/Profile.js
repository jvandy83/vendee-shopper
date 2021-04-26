import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
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
	},
});

export default mongoose.Model('Profile', profileSchema);
