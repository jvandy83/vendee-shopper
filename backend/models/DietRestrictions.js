import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
	restrictions: [String],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default mongoose.model('Profile', profileSchema);
