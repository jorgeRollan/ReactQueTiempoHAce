import axios from 'axios';

const FetchWeatherByCity = async (selectCity, handleFetch, units = 'metric') => {
    const appUrl = import.meta.env.VITE_APP_URL;
    try {
        const response = await axios.get(`${appUrl}:8000/api/weatherCity`, {
            params: {
                selectCity: selectCity,
                units: units
            },
            withCredentials: true
        });
        handleFetch(response.data);
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            window.alert("Error comprobando tiempo por ciudadsss: Error de conexión en el servidor");
        } else {
            window.alert("Error comprobando tiempo por ciudad:", error);
        }
    }
};

export default FetchWeatherByCity;
