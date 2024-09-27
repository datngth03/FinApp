import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: 'http://localhost:5119',
    timeout: 1000,
});

apiClient.interceptors.request.use(async (config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log('Token has expired or is invalid.');
        const refreshToken = Cookies.get('refreshToken');
        try {
            const { data } = await axios.post('/refresh-token', {
                AccessToken: Cookies.get('token'),
                RefreshToken: refreshToken
            });
            Cookies.set('token', data.accessToken, { expires: 1 });
            Cookies.set('refreshToken', data.refreshToken, { expires: 7 });

            apiClient.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
            console.log('Token has refresh succesfull!');
            return apiClient(originalRequest);
        } catch (err) {
            console.error('Refresh token failed', err);
            Cookies.remove('token');
            Cookies.remove('refreshToken');
        }
    }
    return Promise.reject(error);
});

export default apiClient;
