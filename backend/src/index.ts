import { readdirSync } from 'fs';
import path from 'path';
import credentials from './credentials.json';

import mongoose from 'mongoose';
import express from 'express';

import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//* NOTE: don't change the port as it is hardcoded in `@root/package.json` (and possibly more)
const port = 2346;
const app = express();

const sessionOptions: session.SessionOptions = {
	secret: 'secret lol',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: 'auto' }
};

const corsOptions: cors.CorsOptions = {
	origin: '*',
	credentials: true,
	optionsSuccessStatus: 200
};

app.set('trust proxy', 1);

// middlewares
app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// dynamically handle routes
const routeFiles = readdirSync('./src/routes', { encoding: 'utf-8' });

for (const routeFile of routeFiles) {
	const routePath = path.join(__dirname, 'routes', routeFile);
	
	import(routePath)
		.then(module => {
			app.use(module.path, module.router);
			console.log(`Successfully mapped router '${module.path}'`);
		})
		.catch(error => console.error(error));
}

// initialize database
let uri = 'mongodb+srv://<username>:<password>@maincluster.gcavmym.mongodb.net/maindb?retryWrites=true&w=majority&appName=MainCluster';
uri = uri.replace('<username>', credentials.username);
uri = uri.replace('<password>', credentials.password);

mongoose.connect(uri);

mongoose.connection.once('open', () => {
	console.log('Database connection established successfully!');
}).on('error', error => console.error(error));

// listen on port
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// listen on process exit
process.on('SIGINT', () => {
	console.log('Shutting down...');
	server.close();
});