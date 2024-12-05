import axios from 'axios';

const RegisterUser = async (formData) => {
    const appUrl = import.meta.env.VITE_APP_URL;
    try {
        const response = await axios.post(`${appUrl}:8000/register`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return { success: true, message: response.data.message };
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message || 'Error al registrar.' };
        }
    }
};

export default RegisterUser;