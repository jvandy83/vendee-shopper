import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import 'regenerator-runtime/runtime.js';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/authContext';

import App from './components/App';

ReactDOM.render(
	<AuthProvider>
		<Router>
			<App />
		</Router>
	</AuthProvider>,
	document.querySelector('#root'),
);
