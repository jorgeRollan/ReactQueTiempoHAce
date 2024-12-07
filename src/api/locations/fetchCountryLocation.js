import { getRequest, BASE_URL } from '../apiConfig';
import handleError from '../../utils/handleError';

const fetchCountryLocation = async (country, handleFunction) => {
    const url = `${BASE_URL}/api/geoCountry?selectCity=${country.capital}&selectCountry=${country.code}`;

    try {
        const response = await getRequest(url, {
            headers: { 'Content-Type': 'application/json' },
        }, true);
        handleFunction(response);
    } catch (error) {
        const errorMessage = handleError(error, 'Error al obtener la ubicación del país.');
        alert(errorMessage);
    }
};

export default fetchCountryLocation;