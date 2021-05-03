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
		required: [true, 'Please add an email'],
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	firstName: String,
	lastName: String,
	tokenVersion: {
		type: Number,
		default: 0,
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'Profile',
	},
	resetPasswordToken: String,
	resetPasswordDate: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('User', userSchema);
