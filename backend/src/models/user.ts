import mongoose from 'mongoose';

const mUser = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	pfpUrl: { type: String, required: false },
	isTeamLeader: { type: Boolean, required: true },
	teamMembers: { type: [mongoose.Types.ObjectId], required: true }
});

export default mongoose.model('user', mUser);