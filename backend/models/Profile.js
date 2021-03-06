import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
	street: String,
	city: String,
	state: String,
	zipcode: Number,
	phoneNumber: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default mongoose.model('Profile', profileSchema);
