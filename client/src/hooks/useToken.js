let accessToken;

export const useToken = () => {
	const getAccessToken = () => {
		return accessToken;
	};
	const setAccessToken = (s) => {
		accessToken = s;
	};
	return {
		getAccessToken,
		setAccessToken,
	};
};
