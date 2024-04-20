import z from 'zod';

const loginUser = z.object({
	email: z
		.string()
		.min(1, 'This field is required.')
		.email('Invalid email address.'),
	
	password: z
		.string()
		.min(6, 'Password must be of at least 6 characters in length')
});

export default loginUser;