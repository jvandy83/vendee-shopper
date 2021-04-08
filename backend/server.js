import dotenv from 'dotenv';

import express from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import connectLivereload from 'connect-livereload';
import livereload from 'livereload';

// current work around for using __dirnmae with esImports
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'client', 'dist')));


// set up hot reload in the 
// browser for development
if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, '../', 'client', 'dist'));
  app.use(connectLivereload());
}

app.get('*', (_, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../', 'client', 'dist')
  });
});

app.listen(5000, () => {
  console.log(`App listening on port 5000`);
})

