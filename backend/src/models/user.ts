import mongoose from 'mongoose';

// NOTE: upon expanding the fields for registration, extend the loginUser schema rather than creating a separate one
import zUser from '@schemas/loginUser';

const mUser = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true }
});

export const model = mongoose.model('user', mUser);
export const schema = zUser;