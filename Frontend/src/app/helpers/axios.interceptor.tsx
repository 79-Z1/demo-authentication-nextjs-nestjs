import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001',
	timeout: 3 * 1000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Methods': '*',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		if (
			config.url!.indexOf('/auth/signup') >= 0 ||
			config.url!.indexOf('/auth/signin') >= 0 ||
			config.url!.indexOf('/auth/refresh') >= 0
		) {
			return config;
		}

		const accessToken = JSON.parse(
			localStorage.getItem('Authorization') || '',
		);

		if (accessToken) {
			if (config.headers)
				config.headers['Authorization'] = 'Bearer ' + accessToken;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	async (response: any) => {
		const config = response.config;
		if (
			config.url!.indexOf('/auth/signup') >= 0 ||
			config.url!.indexOf('/auth/signin') >= 0 ||
			config.url!.indexOf('/auth/refresh') >= 0
		) {
			return response;
		}
		return response;
	},
	async (error) => {		
		if (error) {
			const originalRequest = error.config;
			const response = error.response.data;

			if (
				response.statusCode === 401 &&
				response.message === 'jwt expired'
			) {
				try {
					console.log("::: Token expired");
					
					const refreshTokenLocal: string = JSON.parse(
						localStorage.getItem('RefreshToken') || '',
					);

					const result = await axiosGet('/auth/refresh', {
						Authorization: 'Bearer ' + refreshTokenLocal,
					});

					const {
						tokens: { accessToken, refreshToken }
					} = result;

					console.log("::: Đã làm mới access token thành công");
					localStorage.setItem('Authorization', JSON.stringify(accessToken));
					localStorage.setItem('RefreshToken', JSON.stringify(refreshToken));

					originalRequest.headers[
						'Authorization'
					] = `Bearer ${accessToken}`;

					return axios(originalRequest);
				} catch (error) {
					console.log(error);
				}
			}
		}

		return Promise.reject(error);
	},
);

export async function axiosGet(url: string, headers = {}) {
	return (
		await axiosInstance.get(url, {
			headers,
		})
	).data;
}

export async function axiosPost(url: string, payload: any) {
	return (await axiosInstance.post(url, payload)).data;
}

export default axiosInstance;
