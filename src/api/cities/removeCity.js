import { BASE_URL, postRequest } from '../apiConfig';
import handleError from '../../utils/handleError';

const removeCity = async (formData, handleChange) => {
    try {
        const response = await postRequest(`${BASE_URL}/deleteCiudad`, formData, true);
        handleChange(response);
    } catch (error) {
        const errorMessage = handleError(error, 'Error al eliminar la ciudad. Por favor, inténtalo de nuevo.');
        alert(errorMessage);
    }
};

export default removeCity;