import commonConfig from './webpack.common.js';
import prodConfig from './webpack.prod.js';
import devConfig from './webpack.dev.js';

import { merge } from 'webpack-merge';

const env = process.env.NODE_ENV;

export default () => {
	switch (env) {
		case 'development':
			return merge(commonConfig, devConfig);
		case 'production':
			return merge(commonConfig, prodConfig);
		default:
			throw new Error('No matching configuration was found!');
	}
};
