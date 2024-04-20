import mongoose from 'mongoose';
import z from 'zod';

import loginUser from '@schemas/loginUser';

const zUser = loginUser.extend({
	pfpUrl: z
		.string()
		.url('Invalid image URL')
});

const mUser = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	pfpUrl: { type: String, required: false }
});

export const model = mongoose.model('user', mUser);
export const schema = zUser;