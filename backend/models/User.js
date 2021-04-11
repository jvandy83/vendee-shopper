import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
	email: String,
	password: String,
	fullName: String,
	address: {
		street: String,
		city: String,
		state: String,
		zipcode: Number,
	},
	contact: {
		phone: String,
		hidden: Boolean,
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

export default mongoose.model('User', userSchema);
