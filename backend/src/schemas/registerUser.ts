import z from 'zod';

const registerUser = z.object({
	email: z.string().email('Invalid email address.'),
	username: z.string().min(4, 'Username must be at least 4 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long')
});

export default registerUser;