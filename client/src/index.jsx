import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import 'regenerator-runtime/runtime.js';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/authContext.js';

import App from './components/App.jsx';

import axios from 'axios';

const Main = () => {
	const [isRegistered, setRegister] = useState(false);

	return <App isRegistered={isRegistered} setRegister={setRegister} />;
};

ReactDOM.render(
	<AuthProvider>
		<Router>
			<Main />
		</Router>
	</AuthProvider>,
	document.querySelector('#root'),
);
