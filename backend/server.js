import dotenv from 'dotenv';

import express from 'express';

import mongoose from 'mongoose';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';

import connectLivereload from 'connect-livereload';
import livereload from 'livereload';

import cookieParser from 'cookie-parser';

// current work around for using __dirnmae with esImports
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'client', 'dist')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE',
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// app.use(
// 	cookieParser({
// 		secret: 'secret',
// 	}),
// );

// set up hot reload in the
// browser for development
if (process.env.NODE_ENV === 'development') {
	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch(path.join(__dirname, '../', 'client', 'dist'));
	app.use(connectLivereload());
}

app.get('*', (_, res) => {
	res.sendFile('index.html', {
		root: path.join(__dirname, '../', 'client', 'dist'),
	});
});

app.use('/v1/api/auth', authRoutes);

const MONGO_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const main = async () => {
	mongoose
		.connect(
			`mongodb+srv://jared123:jared123@vanthedev.k2rxc.mongodb.net/vendee-shopper?retryWrites=true&w=majority`,
			MONGO_OPTIONS,
		)
		.then((conn) => {
			app.listen(5000, (err) => {
				console.log(`app is listening on port 5000`);
			});
		});
};

main();
