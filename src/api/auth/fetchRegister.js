import { postRequest, BASE_URL } from './../apiConfig';
import handleError from '../../utils/handleError';

const fetchRegister = async (formData) => {
    try {
        const result = await postRequest(`${BASE_URL}/register`, formData, true);
        return {
            success: true,
            message: 'Registro exitoso.',
            data: result.data,
        };
    } catch (error) {
        const errorMessage = handleError(error, 'Error al registrar.');
        return { success: false, message: errorMessage };
    }
};

export default fetchRegister;