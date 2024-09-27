import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');

        if (token && refreshToken) {
            // Lưu trữ token và refresh token vào cookies
            Cookies.set('token', token);
            Cookies.set('refreshToken', refreshToken);

            // Cập nhật trạng thái người dùng
            const userObj = {
                userName: params.get('userName') || '',
                email: params.get('email') || ''
            };
            Cookies.set('user', JSON.stringify(userObj));

            // Redirect đến trang chính sau khi đăng nhập thành công
            navigate('/search');
        } else {
            console.error('No token or refresh token found in URL');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default LoginCallback;
