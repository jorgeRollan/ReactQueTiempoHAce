import axios from 'axios';

// Obtener la URL base de la API desde el archivo .env o una constante predeterminada
const BASE_URL = import.meta.env.VITE_APP_URL;

// Función para manejar las respuestas de la API
const handleResponse = (response) => {
    if (response.status !== 200) {
        throw new Error(response.data.message || 'Error en la solicitud');
    }
    return response.data;
};

// Función para realizar solicitudes 'POST' con axios
const postRequest = async (url, body, withCredentials = false) => {
    try {
        const response = await axios.post(`${url}`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: withCredentials, // Añadido para permitir cookies/autenticación
        });

        return handleResponse(response); // Maneja la respuesta
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
        throw error; // Lanzamos el error para ser manejado por el componente
    }
};

// Función para realizar solicitudes 'GET' con axios
const getRequest = async (url, params, withCredentials = false) => {
    try {
        const response = await axios.get(`${url}`, {
            params, // Los parámetros que se pasan para la consulta
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: withCredentials, // Añadido para permitir cookies/autenticación
        });

        return handleResponse(response); // Maneja la respuesta
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
        throw error; // Lanzamos el error para ser manejado por el componente
    }
};

// Exportamos las funciones y la URL base para usarlas en otros archivos
export { BASE_URL, postRequest, getRequest, handleResponse };
