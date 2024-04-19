import { readdirSync } from 'fs';
import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//* NOTE: don't change the port as it is hardcoded in `@root/package.json` (and possibly more)
const port = 2346;
const app = express();
const corsOptions: cors.CorsOptions = {
	origin: '*',
	credentials: true,
	optionsSuccessStatus: 200
};

// middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// dynamically handle routes
const routeFiles = readdirSync('./src/routes', { encoding: 'utf-8' });

for (let routeFile of routeFiles) {
	const routePath = path.join(__dirname, 'routes', routeFile);
	
	import(routePath)
		.then(module => {
			app.use(module.path, module.router);
			console.log(`Successfully mapped router '${module.path}'`);
		})
		.catch(error => console.error(error));
}

// listen on port
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// listen on process exit
process.on('SIGINT', () => {
	console.log('Shutting down...');
	server.close();
});