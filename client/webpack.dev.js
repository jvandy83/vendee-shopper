import dotenv from 'dotenv';

dotenv.config();

export default {
  output: {
    clean: true
  },
	devtool: 'eval-source-map',
	mode: process.env.NODE_ENV,
};