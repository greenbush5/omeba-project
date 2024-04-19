// this is an example of an API route
import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
	res.send('Hello, World!');
});

/* a global path to this router */
const path = '/example';
export { router, path };