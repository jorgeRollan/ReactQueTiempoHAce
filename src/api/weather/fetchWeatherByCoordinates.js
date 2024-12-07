import { getRequest, BASE_URL } from './../apiConfig';
import handleError from '../../utils/handleError';

const fetchWeatherByCoordinates = async (lat, lon, units, handleFetch) => {
    try {
        const params = {
            lat: lat,
            lon: lon,
            units: units,
        };

        const response = await getRequest(`${BASE_URL}/api/weatherLocation`, params);
        handleFetch(response);
    } catch (error) {
        const errorMessage = handleError(error, 'Error comprobando tiempo por ubicación.');
        alert(errorMessage);
    }
};

export default fetchWeatherByCoordinates;