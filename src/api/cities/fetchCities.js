import { BASE_URL, getRequest } from '../apiConfig';
import handleError from '../../utils/handleError';

const fetchCities = async (type, handleFunction) => {
    const endpoint = type === 'favorites' ? `${BASE_URL}/ciudades` : `${BASE_URL}/ciudadesHistory`;

    try {
        const response = await getRequest(endpoint, {}, true);
        console.log(response)
        if (response) {
            handleFunction(response);
        }
    } catch (error) {
        const message = 
            type === 'favorites'
                ? 'El usuario no tiene ciudades favoritas guardadas.'
                : 'No se pudo obtener el historial de ciudades.';
        const errorMessage = handleError(error, message);
        alert(errorMessage);
    }
};

export default fetchCities;