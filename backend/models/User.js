import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email',
		],
		required: [true, 'Please add a name'],
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false,
	},
	fullName: {
		type: String,
		required: [true, 'Please add your name'],
	},
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
	resetPasswordToken: String,
	resetPasswordDate: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('User', userSchema);
