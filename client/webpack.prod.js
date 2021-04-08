import dotenv from 'dotenv';

dotenv.config();

export default {
	mode: process.env.NODE_ENV,
  devtool: 'source-maps'
};