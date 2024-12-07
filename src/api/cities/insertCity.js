import { BASE_URL, postRequest } from '../apiConfig';
import handleError from '../../utils/handleError';

const insertCity = async (cityData, handleChange) => {
    try {
        const response = await postRequest(`${BASE_URL}/insertCiudad`, cityData, true);
        handleChange(response);
    } catch (error) {
        const errorMessage = handleError(error, 'Error al guardar la ciudad. Verifica si ya está en tu lista.');
        alert(errorMessage);
    }
};

export default insertCity;