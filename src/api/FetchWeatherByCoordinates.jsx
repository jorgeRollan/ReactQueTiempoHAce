import axios from 'axios';

const FetchWeatherByCoordinates = async (lat, lon, units, handleFetch) => {
    const appUrl = import.meta.env.VITE_APP_URL;
    try {
        const response = await axios.get(`${appUrl}:8000/api/weatherLocation`, {
            params: { lat, lon, units },
            withCredentials: true
        });
        handleFetch(response.data);
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            window.alert("Error comprobando tiempo por ubicación: Error de conexión en el servidor");
        }
        else
            window.alert("Error comprobando tiempo por ubicación:", error);
    }
};

export default FetchWeatherByCoordinates;