import axios from 'axios';

const LoginUser = async (formData) => {
    const appUrl = import.meta.env.VITE_APP_URL;
    try {
        const response = await axios.post(`${appUrl}:8000/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return {
            success: true,
            message: 'Inicio de sesión exitoso.',
            data: response.data
        };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Error al iniciar sesión.'
            };
        }
    }
};

export default LoginUser;
