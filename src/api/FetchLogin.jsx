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
            // Handle specific error for CAPTCHA validation failure
            if (error.response.status === 422 && error.response.data.message === 'reCAPTCHA validation failed') {
                return {
                    success: false,
                    message: 'La validación del CAPTCHA falló. Por favor, inténtalo de nuevo.'
                };
            }

            // Handle other errors
            return {
                success: false,
                message: error.response.data.message || 'Error al iniciar sesión.'
            };
        }

        // Catch any other errors
        return {
            success: false,
            message: 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo más tarde.'
        };
    }
};

export default LoginUser;
