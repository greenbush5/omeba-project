import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	pfpUrl: { type: String, required: false },
	isTeamLeader: { type: Boolean, required: true },
	teamMembers: { type: [String], required: true },
	teamBannerUrl: { type: String, required: false },
	bio: { type: String, required: false }
});

export default mongoose.model('user', userSchema);