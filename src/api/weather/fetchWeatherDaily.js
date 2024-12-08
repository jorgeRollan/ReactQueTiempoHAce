import { getRequest, BASE_URL } from '../apiConfig';
import handleError from '../../utils/handleError';

const fetchWeatherDaily = async (params, handleFetch) => {
    try {
        const response = await getRequest(`${BASE_URL}/api/weatherForecast`, params);
        handleFetch(response);
    } catch (error) {
        const errorMessage = handleError(error, 'Error comprobando tiempo por horas.');
        alert(errorMessage);
    }
};

export default fetchWeatherDaily;