import jwt_decode from 'jwt-decode';

import axios from 'axios';

import { getAccessToken } from '../hooks/useToken';

export const BASE_URL_AUTH = `http://localhost:5000/api/v1/auth`;

export const BASE_URL = `http://localhost:5000/api/v1`;

const defaultOptions = {
	BASE_URL,
	method: 'post',
	headers: {
		'Content-Type': 'application/json',
	},
};
// Create Instance
const instance = axios.create(defaultOptions);

// Set the auth token for any request
instance.interceptors.request.use(
	(request) => {
		request.headers.Authorization = getAccessToken()
			? `Bearer ${getAccessToken()}`
			: '';
		return request;
	},
	(err) => Promise.reject(err),
);

// Last step: handle request error general case
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		// Error
		const {
			config,
			response: { status },
		} = error;

		if (status === 403) {
			// Unauthorized request: maybe access token has expired!
			const decoded = jwt_decode(getAccessToken());
			if (decoded.exp > Date.now()) {
				console.log('this is where to resend request');
				console.log('expired token');
				console.log('config', config);
				// return refreshAccessToken(config);
			}
		} else {
			return Promise.reject(error);
		}
	},
);

export default instance;
