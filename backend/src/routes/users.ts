import mongoose from 'mongoose';
import express from 'express';

import { validateRequest } from 'zod-express-middleware';
import { StatusCodes } from 'http-status-codes';

import session from 'express-session';
import createResponse from '@utils/response';
import { model as userModel, schema as userSchema } from '@models/user';
import loginUserSchema from '@schemas/loginUser';

import { hashSync, compareSync } from 'bcrypt';
const SALT_ROUNDS = 10;

type CustomSessionData = session.Session & Partial<session.SessionData> & {
	userId: mongoose.Types.ObjectId
};

const router = express.Router();

async function getUserById(id: mongoose.Types.ObjectId) {
	const foundUser = await userModel.findById(id).exec();
	return foundUser ?? undefined;
}

router.get('/me', async (req, res) => {
	const session = req.session as CustomSessionData;
	
	if (!session.userId) {
		console.log('[GET /users/me] Attempt to query while logged out');
		res.send(createResponse('You must be logged in to visit this page', StatusCodes.UNAUTHORIZED, false));

		return;
	}

	const { userId } = session;
	const foundUser = await getUserById(userId);

	if (!foundUser) {
		console.log(`[GET /users/me] Session has non-existing user ID '${userId}'`);
		res.send(createResponse('User with provided ID was not found', StatusCodes.NOT_FOUND, false));
		session.destroy(() => {});
		
		return;
	}

	res.send(createResponse({
		id: foundUser._id,
		email: foundUser.email,
		password: foundUser.password
	}, StatusCodes.OK, true));
});

router.post('/login', validateRequest({ body: loginUserSchema }), async (req, res) => {
	const session = req.session as CustomSessionData;
	
	if (session.userId) {
		const foundUser = await getUserById(session.userId);

		if (foundUser) {
			console.log('[GET /users/login] Attempt to login while logged in');
			res.send(createResponse('You must be logged out to visit this page', StatusCodes.IM_A_TEAPOT, false));

			return;
		} else {
			session.destroy(() => {});
		}
	}

	const { email, password } = req.body;
	const foundUser = await userModel.findOne({ email }).exec();

	if (!foundUser) {
		console.log(`[GET /users/login] Attempt to log into a non-existing user with email '${email}'`);
		res.send(createResponse('Email or password is incorrect', StatusCodes.BAD_REQUEST, false));

		return;
	}

	if (!compareSync(password, foundUser.password)) {
		console.log(`[GET /users/login] Attempt to log into user with email '${email}' with incorrect password '${password}'`);
		res.send(createResponse('Email or password is incorrect', StatusCodes.BAD_REQUEST, false));

		return;
	}

	(req.session as CustomSessionData).userId = foundUser._id;
	req.session.save();

	console.log(`[GET /users/login] User logged in with email '${email}' and password '${password}'`);
	res.send(createResponse('Successfully logged in', StatusCodes.OK, true));
});

router.post('/', validateRequest({ body: userSchema }), async (req, res) => {
	const session = req.session as CustomSessionData;
	
	if (session.userId) {
		const foundUser = await getUserById(session.userId);

		if (foundUser) {
			console.log('[POST /users] Attempt to create user while logged in');
			res.send(createResponse('You must be logged out to visit this page', StatusCodes.IM_A_TEAPOT, false));

			return;
		} else {
			session.destroy(() => {});
		}
	}

	const { email } = req.body;
	const password = hashSync(req.body.password, SALT_ROUNDS);

	const foundUser = await userModel.findOne({ email }).exec();

	if (foundUser) {
		console.log(`[POST /users] Attempt to create user with existing email '${email}'`);
		res.send(createResponse('User with provided email already exists', StatusCodes.BAD_REQUEST, false));

		return;
	}

	const newUser = new userModel({ _id: new mongoose.Types.ObjectId(), email, password });
	await newUser.save();

	(req.session as CustomSessionData).userId = newUser._id;
	req.session.save();

	console.log(`[POST /users] New user created: ${JSON.stringify(newUser.toJSON())}`);
	res.send(createResponse({ message: 'User successfully created', id: newUser._id }, StatusCodes.OK, true));
});

/* a global path to this router */
const path = '/users';
export { router, path };