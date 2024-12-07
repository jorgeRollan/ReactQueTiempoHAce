import { getRequest, BASE_URL } from './../apiConfig';
import handleError from '../../utils/handleError';

const fetchWeatherByCity = async (selectCity, handleFetch, units = 'metric') => {
    try {
        const params = {
            selectCity: selectCity,
            units: units,
        };

        const response = await getRequest(`${BASE_URL}/api/weatherCity`, params, true);
        handleFetch(response);
    } catch (error) {
        const errorMessage = handleError(error, 'Error comprobando tiempo por ciudad.');
        alert(errorMessage);
    }
};

export default fetchWeatherByCity;