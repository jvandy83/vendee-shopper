import React from 'react';
import ReactDOM from 'react-dom';

import 'regenerator-runtime/runtime.js';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { ProfileProvider } from './context/profileContext';

import App from './components/App';

ReactDOM.render(
	<Router>
		<AuthProvider>
			<ProfileProvider>
				<App />
			</ProfileProvider>
		</AuthProvider>
	</Router>,
	document.querySelector('#root'),
);
