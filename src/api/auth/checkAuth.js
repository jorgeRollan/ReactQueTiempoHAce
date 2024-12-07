import { BASE_URL, getRequest } from './../apiConfig';
import handleError from '../../utils/handleError';

const checkAuth = async () => {
    try {
        const response = await getRequest(`${BASE_URL}/check-auth`, {}, true);
        return response;
    } catch (error) {
        const errorMessage = handleError(error, 'Error comprobando autenticación.');
        alert(errorMessage);
    }
};

export default checkAuth;
