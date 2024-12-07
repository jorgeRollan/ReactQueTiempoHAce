import { postRequest, BASE_URL } from './../apiConfig';
import handleError from '../../utils/handleError';

const logout = async (formData) => {
    try {
        const result = await postRequest(`${BASE_URL}/logout`, {}, true);
        return {
            success: true,
            message: 'Cierre de sesión exitoso.',
            data: result.data,
        };
    } catch (error) {
        const errorMessage = handleError(error, 'Error al cerrar sesión.');
        return { success: false, message: errorMessage };
    }
};

export default logout;