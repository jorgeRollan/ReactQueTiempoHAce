const handleError = (error, customMessage = 'Ocurrió un error inesperado.') => {
    let errorMessage = customMessage;

    if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Error de conexión al servidor. Por favor, inténtalo más tarde.';
    } else if (error.response) {
        errorMessage = error.response.data?.message || 'Error en la respuesta del servidor.';
    } else if (error.request) {
        errorMessage = 'No se recibió respuesta del servidor.';
    } else {
        errorMessage = error.message || 'Error desconocido.';
    }

    // Log the error for debugging
    console.error('Error:', error);

    // Return the error message (calling functions can decide how to display it)
    return errorMessage;
};

export default handleError;