import axios from 'axios';

const FetchCountryLocation = async (url, method, header, handleFunction) => {
    try {
        const response = await axios({
            url: url,
            method: method,
            header: header,
            withCredentials: true
        });
        if (response.status === 200) {
            handleFunction(response.data);
        }
        else throw new Error(`Error en la obtencion url ${response.data.cod}`);
    }
    catch (error) {
        if (error.status === 406) {
            window.alert("No se pudo obtener la ubicación del país, intenta de nuevo.");
        }
        else
            window.alert(error.message);
    }
};

export default FetchCountryLocation;