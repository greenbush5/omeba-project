import z from 'zod';

export default z.object({
	email: z.string().min(1).email('Invalid email address.'),
	username: z.string().min(4, 'Username must be at least 4 characters long.'),
	password: z.string().min(6, 'Password must be at least 6 characters long.'),
	pfpUrl: z.string().min(1).url('Invalid profile image url.'),
	isTeamLeader: z.boolean(),
	teamMembers: z.array(z.string()),
	teamBannerUrl: z.string().min(1).url('Invalid banner image url.'),
	bio: z.string()
});