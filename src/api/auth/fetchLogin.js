import { postRequest, BASE_URL } from './../apiConfig';
import handleError from '../../utils/handleError';

const fetchLogin = async (formData) => {
    try {
        const result = await postRequest(`${BASE_URL}/login`, formData, true);
        return {
            success: true,
            message: 'Inicio de sesión exitoso.',
            data: result.data,
        };
    } catch (error) {
        const errorMessage = handleError(error, 'Error al iniciar sesión.');
        return { success: false, message: errorMessage };
    }
};

export default fetchLogin;